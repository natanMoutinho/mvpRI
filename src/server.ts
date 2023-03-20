import app from './app'
import routes from './routes'
import express from 'express'
const PORT = process.env.PORT || 3333

// app.get('/',(req,res) =>{
// 	// res.sendFile(__dirname+'/../public/index.html')
// 	res.sendFile(path.join(__dirname, '/../public/index.html'));
// })
// restesdfasdfas
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(routes);

app.use('/css',express.static(__dirname + '/../public/css'))
app.use('/js',express.static(__dirname + '/../public/js/'))

app.listen(PORT,()=>{
	console.log(`Server running at port ${PORT}, http://localhost:${PORT} testando:${process.env.TEST}` )
});
// res.sendFile(path.join(__dirname, '/../public/index.html'));