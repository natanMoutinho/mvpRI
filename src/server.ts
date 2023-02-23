import app from './app'
import path from 'path'
const PORT = process.env.PORT || 3333

app.get('/',(req,res) =>{
	// res.sendFile(__dirname+'/../public/index.html')
	res.sendFile(path.join(__dirname, '/../public/index.html'));
})
// restesdfasdfas
app.listen(PORT,()=>{
	console.log(`Server running at port ${PORT}, http://localhost:${PORT}` )
})
// res.sendFile(path.join(__dirname, '/../public/index.html'));