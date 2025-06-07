const express = require('express');
const axios = require('axios')
const cors = require('cors')
const https = require('https');
const { error } = require('console');
const app = express();

const port = 6969
app.use(cors());

const axiosInstance = axios.create({
    // httpsAgent: new https.Agent({
    //     rejectUnauthorized: false
    // })
    baseURL: 'https://favqs.com/api',
     headers: {
     'Authorization': 'Token token=c139a814e050c89e9027aed44ed6a3a3' 
  }
})

app.get('/api/quotes/random',async(req,res)=>{
    try{
        // const response = await axiosInstance.get('https://api.quotable.io/random');
        // const response = await axiosInstance.get('https://zenquotes.io/api/random');
        const response = await axiosInstance.get('/qotd');
        res.json(response.data.quote)
    }
    catch(error){
        console.error('Error fetching random quote...', error.message);
        res.status(500).json({error: 'Failed to fetch random quote'});
    }
})

app.get('/api/quotes/search',async(req,res)=>{
    const author =req.query.author;
    if(!author){
        return res.status(400).json({error:'Missing author parameter'})
    }
    try{
        // const searchResponse = await axiosInstance.get(`https://api.quotable.io/quotes?author=${encodeURIComponent(author)}`);
        // const searchResponse = await axiosInstance.get(`https://zenquotes.io/api/quotes/author/${encodeURIComponent(author)}`);
        const searchResponse = await axiosInstance.get(`/quotes`,{params:{filter:author,type:'author'}})
        if(searchResponse.data.quotes.length==0){
            return res.status(404).json({error:'No qoutes found for the given author'})
        }
        res.json(searchResponse.data.quotes);
    }
    catch(error){
        console.error('Error fetching quotes...',error.message);
        res.status(500).json({error: 'Failed to search quotes'});
    }
})

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
})