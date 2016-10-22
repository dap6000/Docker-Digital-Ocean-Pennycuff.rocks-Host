<?php 
  $demos = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100', 'd7', 'd30', 'fudge-die', 'funky-die', 'exploding-die', 'pool', 'sumPool', 'fudge-pool', 'maxPool', 'successPool', '8ball', 'insults', 'encounter-table'];
  $myfile = '';
  if (! empty($_GET['demo']) && in_array($_GET['demo'], $demos)) {
    $myfile = $_GET['demo'] . '.js';
  }
  if (empty($myfile)) {
?>    
  <!doctype html>
  <html class="no-js" lang="">
    <head>
      <title>Oops!</title>
    </head>
    <body>
      <h1>No demo selected!</h1>
      <p>Available demos:</p>
      <ul>
      <?php 
      foreach ($demos as $d) :
        echo '<li><a href="demos.php?demo=', $d,'">', $d, '.js</a></li>';
      endforeach;
      ?>
      </ul>
    </body>
  </html>
<?php    
  } else {
      include('tutorialbuilder.php');
      $docs = new tutorial;
      $docs->maketutorial($myfile); 
?>
<!doctype html>
<html class="no-js" lang="">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title><?php echo $docs->title; ?></title>
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="tutorialbuilder.css" type="text/css" charset="utf-8">
	</head>
	<body>

	  <div id="doc2" class="yui-t2">
      <div id="hd">
        <h1><?php echo $docs->name;?></h1>
      </div>
      <div id="bd">
        <div id="yui-main">
          <div class="yui-b" id="content">

            <h2 id="what">What is <?php echo $docs->name;?>?</h2>
            <p><?php echo $docs->description;?><p>

            <h2 id="example">Example</h2>
            <p id="magic">Result: <span id="result"></span></p>
        		<button id="moar">Another!</button>
        		<h2>How the Template Works</h2>
        		<p>The code for this demo creates an object showcasing a feature of the RollPlayer.js
        		library and returns it to the template as <code>demo.rollable</code>. Both when the page
        		loads and when the button above is pressed the template code calls <code>demo.rollable.roll()</code>
        		and the returned result is displayed above. This process is identicle for all the demos
        		allowing the explanations below to focus on only the object being demoed.</p>
        		<p>Every result is also logged to the <code>console</code> if you want to see a history after
        		a bunch of button clicks.</p>

            <h2 id="version">Version</h2>
            <p><?php echo $docs->version;?></p>

            <h2 id="authors">Authors</h2>
            <ul><?php echo $docs->authorslist;?></ul>

            <h2 id="hp">Full source</h2>
            <p><?php echo $docs->script;?></p>

            <h2 id="info">Explanations</h2>
            <p><?php echo $docs->documentation;?></p>

            </div>
          </div>

          <div class="yui-b" id="sidebar">
            <ul>
              <li><a href="#what">What is <?php echo $docs->name;?></a></li>
              <li><a href="#example">Example</a></li>
              <li><a href="#version">Version</a></li>
              <li><a href="#authors">Authors</a></li>
              <li><a href="#hp">Full source</a></li>
              <li><a href="#info">Explanations</a></li>
            </ul>
          </div>

        </div>

        <div id="ft">
          <p><a href="http://christianheilmann.com/2008/05/13/generating-tutorials-from-source-comments-with-tutorialbuilder/">Tutorial Builder</a> is &copy; <a href="http://christianheilmann.com/">Christian Heilmann</a>, 2008. Licensed under <a href="http://christianheilmann.com/license.txt">the BSD license</a>.</p>
        </div>
      </div>


	</body>
	<script type="text/javascript" src="../js/rollplayer.js"></script>
	<script type="text/javascript" src="<?php echo $myfile; ?>"></script>
	<script type="text/javascript" src="demo_template.js"></script>
</html>
<?php  } ?>
