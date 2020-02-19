FROM debian:stretch-slim

WORKDIR /root

# Install and upgrade to the latest libraries
RUN apt-get update \
 && apt-get upgrade -y  \
 && apt-get install -y --no-install-recommends apt-utils \
 && apt-get update \
 && apt-get upgrade -y \
 && apt-get install -y --no-install-recommends htop vim openssl zip telnet g++ build-essential \
                                               wget git gnupg2 psmisc xvfb xauth locales openssh-client\
 && apt-get install -y curl \
 && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8 \
 && rm -rf /var/lib/apt/lists/*

ENV LANG en_US.utf8

# Install Node
RUN ( curl -sL https://deb.nodesource.com/setup_10.x | bash - ) \
 && apt-get update \
 && apt-get install -y python nodejs \
 && rm -rf /var/lib/apt/lists/*

# Create the Downloads directory and open up permissions
RUN mkdir Downloads \
 && chmod 777 Downloads -R \
 && echo "PATH=/root/project/node_modules/.bin:$PATH" >> ~/.bashrc

# Install the latest version of Google Chrome (I got some of this from https://www.tecmint.com/install-google-chrome-in-debian-ubuntu-linux-mint/)
RUN ( wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - ) \
 && sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
 && apt-get update \
 && apt-get install -y --no-install-recommends google-chrome-stable \
 && rm -rf /var/lib/apt/lists/*

# Copy over this source
RUN mkdir /root/project
WORKDIR /root/project
COPY . .

# Install the dependencies
RUN npm install
