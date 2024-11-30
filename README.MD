Criar um novo projeto Express.js, sem Views e com controle de GitHub (.gitignore)

    express --git --no-view   

ou 

clone o projeto 



Alterar o package.json e adicionar 

    "type": "module"

Rodar   
    
    $npm install


alterar os 
    
    "= require()" para "import .... from ....""
    "module.exports = ..."    para "export default ..."


Há um 'workaround' no app.js para o __dirname

    //workaround for __dirname
    import { fileURLToPath } from 'url';
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    // fim do workaround


