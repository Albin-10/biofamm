import express from "express";

const app = express();
app.listen(3000);

app.use(express.json());


const db = [
    {
        name:"post1",
        post:" hello there",
        id:"1"
    },
    {
        name:"post2",
        post:"how are you",
        id:"2"
    },
    {
        name:"post3",
        post:"good morning",
        id:"3"
    }
]

app.get("/posts", (req, res) => {


  res.status(200).json({data:db, ok:true});
});

app.get("/posts/:POST_ID",(req,res)=>{
    console.log(req.params)
    const post = db.find(post => post.id === req.params.POST_ID)
    res.status(200).json({ok:true, data: post})
})


app.post("/posts", (req, res) => {
  const data = req.body;

  if (!data.name || !data.post) {
    return res.status(400).json({
      message: "please provide name and post",
      status: false,
    });
  }

  let payload = {}
  payload.name = data.name
  payload.post = data.post
  payload.id = String(db.length + 1)

  console.log(payload)

  db.push(payload)
  console.log(db)
  res.status(200).json({
    ok:true,
    data: payload
  })
});


