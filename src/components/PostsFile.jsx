import { useState, useEffect } from "react";
// import axios
import axios from "axios";


const initialFormData = {
    titolo: "",
    autore: "",
    contenuto: "",
    categoria: ""
};

const PostsFile = () => {

    const [post, setPost] = useState([]);
    const [formData, setFormData] = useState(initialFormData);

    // Fetching dei dati
    function fetchPosts() {
      axios.get("http://localhost:3000/posts")
        .then((res) => 
          setPost(res.data)
        )
    }
    // Solo al primo rendering
    useEffect(fetchPosts, []);

    // gestisco info nei campi form
    function handleFormData(e) {
        setFormData((currentFormData) => ({
            ...currentFormData,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
      
        setPost(prevPosts => {
          const newPost = {
            id: prevPosts.length === 0 ? 1 : prevPosts[prevPosts.length - 1].id + 1,
            ...formData
          };
      
          const updatedPosts = [...prevPosts, newPost];
          console.log("Nuovi post:", updatedPosts); // ✅ Controllo per vedere se il nuovo post viene aggiunto
          return updatedPosts;
        });
      
        setFormData(initialFormData);
      }

    return (
        <>
            <h1>BLOG</h1>

            <form action="#">
                <input
                 type="text" 
                 name="title"
                 onChange={handleFormData}
                 value={formData.title}
                 placeholder="Nome prodotto"
                />

                <input
                 type="text" 
                 name="content"
                 onChange={handleFormData}
                 value={formData.content}
                 placeholder="contenuto"
                />

                <input
                 type="src" 
                 name="image"
                 onChange={handleFormData}
                 value={formData.image}
                 placeholder="immagine"
                />

                <input
                 type="text" 
                 name="categoria"
                 onChange={handleFormData}
                 value={formData.tags}
                 placeholder="tags"
                />

                <button onClick={handleSubmit}>Aggiungi</button>
            </form>

            {
                post.map((articolo) => (
                    <div className="card" key={articolo.id}>
                        <div className="card-header">
                        <h4 className="card-title">{articolo.title}</h4>
                        </div>

                        <div className="card-body">
                            {/* <h5 className="card-title">{articolo.autore}</h5> */}
                            <p className="card-text">{articolo.content}</p>
                            <p className="card-text"><img src={articolo.image} alt={articolo.content} /></p>
                            <p className="card-text">{articolo.tags}</p>
                            <button>Cancella</button>
                        </div>
                    </div>

                ))
            }
        </>
    )

}

export default PostsFile