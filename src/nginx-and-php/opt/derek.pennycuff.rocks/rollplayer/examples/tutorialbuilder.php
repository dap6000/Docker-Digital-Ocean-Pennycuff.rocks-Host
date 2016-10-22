<?php
  /*
    Tutorialbuilder by Christian Heilmann
    Version: 1.0
    Homepage :http://icant.co.uk/docsmaker
    Copyright (c) 2008, Christian Heilmann
    Code licensed under the BSD License:
    http://wait-till-i.com/license.txt
  */
  class tutorial{
    var $documentation;
    var $script;
    var $rawscript;
    var $title;
    var $name;
    var $date;
    var $contents;
    var $description;
    var $authors;
    var $version;
    var $tags;
    var $authorslist;
    var $tagslist;
    var $license;
    var $licenselink;

    function tutorial(){
      $this->metamatch = "/\/\*startmeta(.*?)endmeta\*\/\n/msi";
      $this->documentation = 'Documentation error, please contact author';
      $this->script = 'Full script missing, please contact author';
      $this->rawscript = 'Raw script missing, please contact author';
      $this->title = 'Title';
      $this->name = 'Name';
      $this->date = 'Date';
      $this->description = 'Description';
      $this->authors = 'Authors';
      $this->version = 'Version';
      $this->tags = 'Tags';
      $this->tagslist = '';
      $this->authorslist = '';
      $this->license = '';
      $this->licenselink = '';
    }

    function maketutorial($filename){
      if(isset($filename)){
        $handle = fopen($filename, 'r');
        $contents = fread($handle, filesize($filename));
        fclose($handle);
        preg_match_all($this->metamatch,$contents,$meta);
        foreach( array('title','name','date','description','authors','version','tags','license') as $item){
          preg_match_all("/".$item.":\s?([^\n]+)/msi",$meta[1][0],$data);
          if($data && ! empty($data[1][0])){ // was getting array index errors, switched to not empty() from !== '' - Derek Pennycuff
            $this->$item = $data[1][0];
          }
        }

        /* assemble taglist */ 
        $out = array();
        foreach(explode(',',$this->tags) as $t){
          $out[]='<li><a href="http://technorati.com/tag/' . str_replace(' ','+',$t) . '" rel="tag">' . $t . '</a></li>';
        }
        $this->taglist = implode($out,'');

        /* assemble authorlist */ 
        $out = array();
        $authors = explode(',',$this->authors);
        foreach($authors as $a){
          if(strpos($a,'(') !== false){
            preg_match_all("/([^\(]+)\s?\(([^\)]+)\)/",$a,$parts);
            $out[]='<li><a href="' . $parts[2][0] . '">' . $parts[1][0] . '</a></li>';
          } else {
            $out[]='<li>' . $a . '</li>';
          }
        }
        $this->authorslist = implode($out,'');

        /* license */ 
        $li = $this->license;
        if(strpos($li,'(') !== false){
          preg_match_all("/([^\(]+)\s?\(([^\)]+)\)/",$li,$parts);
          $this->licenselink = '<a href="' . $parts[2][0] . '">' . $parts[1][0] . '</a>';
        }

        $contents = preg_replace($this->metamatch,'',$contents);
        $this->documentation = $this->makedocs($contents);
        $this->script = $this->makefull($contents,false);
        $raw = "/*startmeta\n".$meta[1][0]."\nendmeta */\n".$contents;
        $this->rawscript = $this->makefull($raw,true);
      }
    }

    function makedocs($contents){
      $chunks = preg_split("/\/\*.*?\*\//msi",$contents);
      preg_match_all("/\/\*(.*?)\*\//msi",$contents,$infos);
      $linenumber = 1;
      $out = array();
      foreach($chunks as $k=>$c){
        if($c!==''){
          if($k>0 && $infos[1]){
            $out[] = $this->convert($infos[1][$k-1]);
          }
          $code = preg_split("/\n/",$c);
          $out[] = '<pre>';
          $out[] = '<ol>';
          foreach($code as $line){
            if(preg_match("/\S/",$line)){
              if(strpos($line, '// *') !== false){
                $out[] = '<li class="highlight"><span>' . $linenumber .":</span>\t". htmlentities(str_replace('// *','',$line)) . "\n</li>";
              } else {
                $out[] = '<li><span>' . $linenumber .":</span>\t". htmlentities($line) . "\n</li>";
              }
              $linenumber++;
            }
          }
          $out[] = '</ol>';
          $out[] = '</pre>';
        }
      }
      return implode($out);
    }

    function makefull($contents,$raw){
      if($raw === false){
        $contents = preg_replace("/\/\*.*?\*\/\n?/msi",'',$contents);
      } else {
        $contents = preg_replace("/\/\/ \*/msi",'',$contents);
      }
      $code = preg_split("/\n/",$contents);
      return $this->addlines($code);
    }

    function addlines($code){
      $linenumber = 1;
      $out = array();
      $out[] = '<pre>';
      $out[] = '<ol>';
      foreach($code as $line){
        if(preg_match("/\S/",$line)){
          if((strpos($line, '// *') !== false)){
            $out[] = '<li class="highlight"><span>' . $linenumber .":</span>\t". htmlentities(str_replace('// *','',$line)) . "\n</li>";
          } else {
            $out[] = '<li><span>' . $linenumber .":</span>\t". htmlentities($line) . "\n</li>";
          }
          $linenumber++;
        }
      }
      $out[] = '</ol>';
      $out[] = '</pre>';
      return implode($out);
    }
    
    function convert($s){
      $s = preg_replace("/\n\s+/msi","\n",$s);
      $s = preg_replace("/#([^#]+)#/","<code>\\1</code>",$s);
      $s = preg_replace("/\*([^\*|\s]+)\*/","<strong>\\1</strong>",$s);
      $lines = preg_split("/\n/",$s);
      $out = array();
      foreach($lines as $l){
        $l = preg_replace('/"([^"]+)":(http:\/\/[^\s]+)/','<a href="\\2">\\1</a>',$l);
        if(preg_match("/^\+/",$l)){
          preg_match_all("/^([\+]+)/",$l,$amount);
          $amount = strlen($amount[0][0]);
          $out[] = '<h'.$amount.'>'.preg_replace('/^[\+]+\s/','',$l).'</h'.$amount.'>';
        } else if(preg_match("/^\*/",$l)){
          $out[] = '<li>'.str_replace('* ','',$l).'</li>';
        } else if(preg_match("/^-\s/",$l)){
          $out[] = '<dt>'.str_replace('- ','',$l).'</dt>';
        } else if(preg_match("/^--/",$l)){
          $out[] = '<dd>'.str_replace('-- ','',$l).'</dd>';
        } else if($l === 'startlist'){
          $out[] = '<ul>';
        } else if($l === 'endlist'){
          $out[] = '</ul>';
        } else if($l === 'startdeflist'){
          $out[] = '<dl>';
        } else if($l === 'enddeflist'){
          $out[] = '</dl>';
        } else {
          if($l !== ''){
            $out[] = '<p>' . $l . '</p>';
          }
        }
      }
      return implode($out,"\n");
    }
    
    function makeminified(){
      $filename = preg_replace('/\//','',$_GET['filename']);
      if(file_exists($filename)){
        $output = isset($_GET['output']) ? $_GET['output'] : $filename; 
        if($filename){
          $handle = fopen($filename, 'r');
          $contents = fread($handle, filesize($filename));
          fclose($handle);
          if(isset($_GET['download'])){
            header("Content-Disposition: attachment; filename=\"" . $output . "\";" ); 
            $type = explode('.',$_GET['download']);
            $type = $type[sizeof($type)-1];
            echo $type;
            header("Content-Type: $ctype");
          } else {
            header("Content-Disposition: attachment; filename=\"" . $output . "\";" ); 
            header("Content-Type: $ctype");
          }
          $contents = preg_replace("/\/\*.*?\*\/\n?/msi",'',$contents);
          $contents = preg_replace("/\/\/ \*/msi",'',$contents);
          if($_GET['minified']!=='false'){
            $contents = preg_replace("/\n\s+/msi",'',$contents);
          }
          echo $contents;
        }
      }
    }
  }
  if(isset($_GET['download']) || isset($_GET['build'])){
    $docs = new tutorial;
    $docs->makeminified();
  }
?>
