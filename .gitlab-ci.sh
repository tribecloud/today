#!/bin/bash

# We need to install dependencies only for Docker
[[ ! -e /.dockerenv ]] && exit 0

set -xe

# Install git (the php image doesn't have it) which is required by composer
apt-get update -yqq
apt-get install git curl unzip libmcrypt-dev libjpeg-dev libpng-dev libfreetype6-dev libbz2-dev -yqq

# Install phpunit, the tool that we will use for testing
curl --location --output /usr/local/bin/phpunit https://phar.phpunit.de/phpunit.phar
chmod +x /usr/local/bin/phpunit

# Install mysql driver
# Here you can install any other extension that you need
docker-php-ext-install mcrypt pdo_mysql zip

# Install Composer
curl --silent --show-error https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install project dependencies.
composer install --no-suggest --prefer-dist

# Copy over testing configuration.
cp .env.example .env

# Generate an application key. Re-cache.
php artisan key:generate
php artisan config:cache
php artisan config:clear
