const path = require('path')
const express = require("express")
const hbs = require('hbs')

const app = express()  


const public_directory_path = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(public_directory_path))

app.get('',(req,res) =>{
    res.render('index', {
        title: 'Weather app',
        name: 'Diogo Barros'
    })
    
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Diogo Barros'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'Help',
        helpText: 'Ajuda aqui',
        name: "Diogo Barros"
    })
})



app.get('/weather', (req,res) =>{
    if (!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    res.send({
        forecast: "It's hot",
        location: "Portugal",
        address: req.query.address
    })
})

app.get('/help/*', (req,res)=>{
    res.render("404",{
        title: '404',
        name: 'Diogo Barros',
        errorMessage: 'Help article not found'
    })
})

app.get('/products', (req,res)=>{
    if (!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    
    res.render({
        products: []
    })
})

app.get('*',(req,res)=>{
    res.render("404",{
        title: '404',
        name: 'Diogo Barros',
        errorMessage: 'Page not found'
    })
})

app.listen(3000,() =>{
    console.log('Server is up on port 3000.')
})