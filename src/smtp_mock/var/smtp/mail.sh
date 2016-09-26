#!/bin/sh
# The filename is provided on the command line via postfix's pipe program, so just append stdin to the file for that account.
tee -a $1
# Make the file world readable so nginx can read it.
chmod a+r $1
