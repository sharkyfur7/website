---
layout: layouts/blogpost.njk
canonical: blog/selfhosting-stuff/

modified: 2026-02-02
date: 2026-02-02

thumbnail: /assets/blog/selfhosting-stuff/thumb.jpg
title: Why I moved my backend to a Raspberry Pi 3 and why you should too
description: AKA Me being excited about selfhosting rather simple services and telling you to do the same
---

# {{title}}

{{description}}

![Photo of my Raspberry Pi 3](/assets/blog/selfhosting-stuff/pi.jpg)

<p style="font-size: large;">Warning: a lot of yapping ahead</p>

First of all yes that is a 128GB USB that I use as storage for the docker images because it has faster writes than the SD card which is some cheap 32GB one my dad didn't need anymore LOL

One day, my father came home with two "broken" Raspberry Pi 3's from work. He brought them to me because I was getting into electronics. The first time I've tried running them I had no idea what I was doing so, of course, I didn't get them to run (I had no idea you need an SD card with an OS). Later though I have acquired an SD card and flashed Raspbian OS onto it and got to work testing these devices out.

The first Pi works alright, but keeps overheating (to like 80C which is the upper limit of safe temperatures for the Pi) even when idle. Honestly I think it is a hardware fault but who knows (if you do, hit me up, I'd love to get that Pi to work). The second Pi though, runs just fine. The only issues it has is a broken ethernet port (don't care, I use wifi) and probably a slight overheating problem but that's not a real issue (it sits at like 56C instead of 45C-50C when idle even though it has a decent heatsink).

Once I've had it up and running, I have realized something. Now I have a server that is silent, draws little power and has good enough compute capability (I mean 1GB RAM is really not a lot but you can do a lot even with so little). So I set up some cool things!

## Services

### <a href="https://www.beszel.dev" target="_blank">Beszel</a>

This is a really cool lightweight monitoring platform. I can see all the basic things like CPU and memory load, network traffic, device temperature and stuff. But what is really cool is that it also monitors docker containers: their CPU and RAM usage and their status.

I quite enjoy opening my window and watching the temperature graph slowly go down and then climb back up when I close it.

### Wake on lan

Well not really a sercice, more of a program you can run but ugh whatever

So I have recently gotten an M1 Macbook Air and I needed to access files on my desktop PC remotely. So I've thought to myself: why not a remote desktop, right? That's a great idea! Except for the part where the target PC would have to be running 24/7 so that you can connect anytime.

Well this program allows you to simply run `wakeonlan <MAC address>` to wake up a given computer, even when it is powered down! You just have to enable listening for a magic packet in your BIOS and BOOM! Your computer can now wake up from it's deep slumber on demand!

This is cool and all but how can you send that command when you're not on the local network? Good question! That ties directly into my next service i am hosting on this little machine!

### <a href="https://tailscale.com" target="_blank">Tailscale</a>

This is basically a VPN. Not in the "LETS THANK OUR SPONSOR" way, but in the "I can communicate with these devices over a secure network even when I am not on site" kind of way.

So now, I can connect to my Pi from anywhere. I made a simple script that SSH's into the Pi and sends the wake on lan command. That wakes up my PC, which also runs Tailscale and thanks to that, I can remote into my desktop PC from anywhere too! All without exposing my Pi directly to the internet!

### My backend

Yes, I run the backend for this site on the same Pi too! Well backend... if you count the guestbook database and notify api as a backendy enough service lmao. I plan on expanding this with more cool stuff once I've got some more time on my hands. Maybe I'll add comments and likes and whatever to this blog if I ever make more than one post lol.

### <a href="https://pi-hole.net" target="_blank">Pihole</a>

Yeah I also run pihole but that's like the most basic bitch service EVER to run on a Pi. And it doesn't even block ads on youtube anymore :(

## So what? Who cares?

Yeah I get that this is cool and all but why do all this?

My answer to that is: _Why not?_

Why should we not be curious and try out technologies we've never tried before? I have (roughly) learned how docker works thanks to this. I have configured my API to run as a container and I think it's awesome.

If you're thinking about selfhosting your own backend, or just looking for a low-power server, check out a Raspberry Pi. It's a surprisingly usable linux server. (I am of course talking about the cheap variants, if you want to spend more you can get like the Pi5 16GB but that's like overkill for a singular Node.js program that gets like 4 visits a day just like my site xd) The more expensive options could technically double up as a desktop computer lmao.

With big platforms making their experiences shitter and shitter, we shall declare independence! Fuck Microslop and the others, we rolling ts on our own ✌️
