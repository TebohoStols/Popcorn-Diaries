import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const movies = [];


app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())


app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.get("/about", (req, res) => {
    res.render("about.ejs")
})

app.get("/contact", (req, res) => {
    res.render("contact.ejs")
})

app.get("/create", (req, res) => {
    res.render("create.ejs", {movie: null, action: "Create"})
})

app.get("/view", (req, res) => {
    res.render("view.ejs", {movies})
}) 

app.get("/edit/:id", (req, res) => {
    const movie = movies.find((m) => m.id === req.params.id)
    if (movie) {
      res.render("create.ejs", { movie, action: "Make changes" })
    } else {
      res.redirect("/view")
    }
})

app.post("/log", (req, res) => {
    const movie = {
        id: Date.now().toString(),
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        genre: req.body.genre,
        description: req.body.description
};

    
    movies.push(movie);

    console.log("Movie logged", movie);

    res.redirect('/');
})



app.post("/edit/:id", (req, res) => {
    const index = movies.findIndex((m) => m.id === req.params.id)
    if (index !== -1) {
      movies[index] = {
        ...movies[index],
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        genre: req.body.genre,
        description: req.body.description,
      }
      res.redirect("/view")
    } else {
      res.status(404).send("Movie not found")
    }
})
  
  app.delete("/delete/:id", (req, res) => {
    const index = movies.findIndex((m) => m.id === req.params.id)
    if (index !== -1) {
      movies.splice(index, 1)
      res.json({ success: true })
    } else {
      res.status(404).json({ success: false, message: "Movie not found" })
    }
  })

app.listen(port, () => {
    console.log(`Popcorn Diaries server running on http://localhost: ${port}`);
});