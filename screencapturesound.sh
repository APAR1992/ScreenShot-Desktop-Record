#!/bin/bash
if [ ! -e $HOME/Videos ]
then
mkdir -p $HOME/Videos
fi
dir="$HOME/Videos"
size=$( xdpyinfo | grep 'dimensions:' | awk '{print $2}' )
name=$( date +'%F_%I:%M' )
video="$dir/$name.mkv"
ffmpeg -f alsa -ac 2 -i pulse -f x11grab -s $size -r 35 -qscale 1  -i :0.0 $video
