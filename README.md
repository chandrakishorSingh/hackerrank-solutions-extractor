<p align=center>
  <br>
  <a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a>
  <img src="https://img.shields.io/badge/os-linux-brightgreen">
  <img src="https://img.shields.io/badge/os-mac-brightgreen">
  <img src="https://img.shields.io/badge/os-windows-brightgreen">
  <img src="https://img.shields.io/badge/os-android-brightgreen">
  <br>
  <h1 align="center">HackerRank Solutions Extractor
    <br>
    <a href="https://github.com/chandrakishorSingh">
      <img src="https://img.shields.io/badge/maintainer-chandrakishorSingh-blue">
    </a>
  </h1>
</p>


https://user-images.githubusercontent.com/42005550/194734763-f14e4bcc-8e15-4078-a647-5f755ed597ed.mp4



# About
A tool to extract all of your submissions from [HackerRank](https://www.hackerrank.com).

# Download and Usage
## Download
- You should first download copy of your profile data from HackerRank by going to your settings page or by clicking [here](https://www.hackerrank.com/settings/account). Under the ```Export Data``` section click on ```Download archive``` button to download a copy of your profile data. This includes, along with other data, all of your submissions that you have made so far.

<img src="https://github.com/chandrakishorSingh/hackerrank-solutions-extractor/blob/master/images/hackerrank-settings-screenshot.png" width=1000>

- Then you have to download this tool. You can do this by following any of below 2 ways.

**1. Using executable** : This is probably the easiest way to use this tool. Go to [executables](https://github.com/chandrakishorSingh/hackerrank-solutions-extractor/tree/master/executables) folder and download the executable that is compatible with your OS.

**2. Using Node** : You can clone this repository and use Node to run the script. You can download Node from [here](https://nodejs.org/en/), in case you don't already have it.

## Usage
**1. Using executable**
  - To extract all of your submission : Open a terminal and run ```hse <path-to-your-profile-data.json.gz> -all```
  - To only extract submissions that have got 100% score : Open a terminal and run ```hse <path-to-your-profile-data.json.gz>```

**2. Using Node**
  - To extract all of your submission : Open a terminal and run ```node main.js <path-to-your-profile-data.json.gz> -all```
  - To only extract submissions that have got 100% score : Open a terminal and run ```node main.js <path-to-your-profile-data.json.gz>```
  
# Configuration
You can configure this tool to add support for other programming languages(see [supported languages](https://github.com/chandrakishorSingh/hackerrank-solutions-extractor#supported-languages)), filter the submissions according to some conditions(eg. extracting all submissions that have scored > 60%).

**1. Adding support for other languages**

You can add support for other languages by adding a new entry in ```fileExtensionMap``` variable of ```utils.js``` file([go to file](https://github.com/chandrakishorSingh/hackerrank-solutions-extractor/blob/master/utils.js#L8)).

**2. Filtering submissions according to some condition**

By default, this tool extracts only those submissions that have obtained 100%. You can change this criteria and specify some other(see [main.js](https://github.com/chandrakishorSingh/hackerrank-solutions-extractor/blob/master/main.js#L21) file). Also you can change the file name of each submission which currently uses the challenge name. I suggest you to extract the .gz file that you downloaded from HackerRank and explore it to customize the behaviour according to your need. This includes various other data that you might be interested in.

# Supported Languages
This tool can extract submissions written in following languages. However, you can add other languages easily. See [configuration.](https://github.com/chandrakishorSingh/hackerrank-solutions-extractor#configuration)

- C
- C++/C++14
- JavaScript
- Python 3.x/2.x
- JAVA
- Haskell
- Bash
- MySQL
- Text(There are some multiple choice questions in HackeRank which stores the results in text files.)
