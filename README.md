# Sponsor Credit API

### Show appreciation to your sponsors
---
### Why did we make this?

GitHub sponsors is a major platform many developers use to fund their open source work, and many developers like to give credit to those sponsoring them through README file or other documents. GitHub sponsors does not provide an easy way of doing this, short of manually writing out sponsor names. This is what our project aims to fix, it provides an easy way to give credit to your GitHub sponsors through your README file, no extra configuration needed.
## How it works?
The projects works by generating a svg that can be embeded in a README or a website using a image tag this svg will have smaller `a` tags which have links to the sponsors profiles! These `a` tags have embeded images that show the profiles the sponsors.

## Usage
##### https://sponsors.harjyotsahni.com/danielroe.svg
Embed the text below text into your readme replacing `danielrow` with your github username!
For markdown:
```md
![sponsors](https://sponsors.harjyotsahni.com/danielroe.svg)
````
For HTML:
```
<img src="https://sponsors.harjyotsahni.com/danielroe.svg"><img>
````
**Fun Fact! Clicking on the link will take you to aninteractive page where you can view sponsors profiles!**
It will end up looking something like this!
![sponsors](https://sponsors.harjyotsahni.com/danielroe.svg?)

### Advanced Options
#### Pfp Sizes
##### https://sponsors.harjyotsahni.com/danielroe.svg?pfpSize=100
The pfp size option determines the size of an pfp, the default being 50 pixels, the maximum is 100 pixels!
##
For markdown:
```md
![sponsors](https://sponsors.harjyotsahni.com/danielroe.svg?pfpSize=100)
```
For HTML:
```
<img src="https://sponsors.harjyotsahni.com/danielroe.svg"><img>
````

![sponsors](https://sponsors.harjyotsahni.com/danielroe.svg?pfpSize=100)
#### Widths
##### https://sponsors.harjyotsahni.com/danielroe.svg?width=100
The width size option determines the size of an image, the default being 600 pixels.
##
For markdown:
```md
![sponsors](https://sponsors.harjyotsahni.com/danielroe.svg?width=100)
```
For HTML:
```
<img src="https://sponsors.harjyotsahni.com/danielroe.svg"><img>
````
#### Experimenting with larger amounts
##### https://sponsors.harjyotsahni.com/ThePhD.svg
Using the api with a larger amount of people will take a bit longer due to the images needing to be requested and edited. Be sure to visit the url that you will use in the browser before adding it to github's cache or your readme.
##
For markdown:
```
![sponsors](https://sponsors.harjyotsahni.com/ThePhD.svg)
```
For HTML:
```
<img src="https://sponsors.harjyotsahni.com/ThePhD.svg"><img>
````
![sponsors](https://sponsors.harjyotsahni.com/ThePhD.svg)
---
---
#  Plans in the future!

### To further develop our project we are planning on adding.
- Adding organisanisation support.
- Adding a aggressive cache to reduce image load times.
- Implimenting more customisable features for for the api.
- Adding an iframable endpoint that has more information while hovering over profiles
