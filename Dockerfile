FROM elixir:1.10.1

# Create app directory and copy the Elixir projects into it
RUN mkdir /app
WORKDIR /app

# install npm
RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash -
RUN apt-get install nodejs

# install nano
RUN apt-get -y install nano

RUN mix local.hex --force
RUN mix local.rebar --force


#EXPOSE 8000
CMD ["/app/entry.sh"]
