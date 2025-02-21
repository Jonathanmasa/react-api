import { useState, useEffect } from "react";
// import axios
import axios from "axios";


// array di posts
// const posts = [
//   {
//     id: 1,
//     titolo: "Introduzione a JavaScript",
//     autore: "Mario Rossi",
//     contenuto: "JavaScript è un linguaggio di programmazione versatile e potente...",
//     categoria: "Programmazione"
//   },
//   {
//     id: 2,
//     titolo: "Come migliorare la SEO del tuo sito web",
//     autore: "Luca Bianchi",
//     contenuto: "La SEO è fondamentale per migliorare la visibilità di un sito web...",
//     categoria: "Marketing"
//   },
//   {
//     id: 3,
//     titolo: "I benefici dello sport sulla salute mentale",
//     autore: "Giulia Verdi",
//     contenuto: "Lo sport non è solo utile per il fisico, ma anche per la mente...",
//     categoria: "Salute"
//   },
//   {
//     id: 4,
//     titolo: "Guida completa a React.js",
//     autore: "Andrea Neri",
//     contenuto: "React.js è una libreria JavaScript per costruire interfacce utente...",
//     categoria: "Programmazione"
//   },
//   {
//     id: 5,
//     titolo: "10 ricette veloci per una cena perfetta",
//     autore: "Carla Fabbri",
//     contenuto: "Se hai poco tempo e vuoi preparare una cena deliziosa...",
//     categoria: "Cucina"
//   }
// ];

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
                
                        </div>
                    </div>

                ))
            }
        </>
    )

}

export default PostsFile