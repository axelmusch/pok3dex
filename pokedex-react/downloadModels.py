import requests
from bs4 import BeautifulSoup

from urllib.request import urlopen
from urllib.request import urlretrieve
import cgi


URL = "https://www.models-resource.com/3ds/pokemonxy/"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")
#print(soup)

results = soup.find_all("div", {"class" : "updatesheeticons"})

for child in results[1].children:
    temp = str(child).split(" ")
    
    downloadUrl = "start"
    pokemon = "start"
    
    if len(temp)>1:
        #print(temp)
        for val in temp:
            #print(val)
            
            if val.startswith("href"):
                number = val.split("/")[-2]
                downloadUrl = "https://www.models-resource.com/download/" + number 
                
            if "</span>" in val:
                pokemon = val.split("<")[0]
                if '\u2640' in pokemon:
                    pokemon = pokemon[:-1]
                    pokemon = pokemon + "_female"
                elif '\u2642' in pokemon:
                    pokemon = pokemon[:-1]
                    pokemon = pokemon + "_male"
        #print(downloadUrl) 
        
        print(pokemon)
        r = requests.get(downloadUrl, allow_redirects=True)
        open('C:/Users/axelm/Desktop/github/pokeDex/pokedex/pokedex-react/src/models-zips/' + pokemon +'.zip', 'wb').write(r.content)

        
