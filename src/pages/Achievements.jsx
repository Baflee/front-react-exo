import React, { useState, useEffect } from "react";
import { fetchBooks } from "../services/bookService";
import { ComicButton } from "../components/generic/Form";
import { fetchCategories } from "../services/categoryService";
import Header from "../components/Header";

function Achievements() {
  const [tickets, setTickets] = useState([
    { 
      id: 1, 
      title: "Demande non résolue",
      description: "Do you sell this book? I was looking through the catalog but couldn’t find a way to buy it. Is it possible to purchase directly from your site?", 
      category: "L1", 
      email: "sophie.b@example.com", 
      resolved: "not detecting" 
    },
    { 
      id: 2, 
      title: "Requête sur le catalogue",
      description: "How can I search for books by a specific author? It’s not very clear where to do that, and I’m struggling to find the books I want.", 
      category: "L1", 
      email: "claire.l@example.com", 
      resolved: "not detecting" 
    },
    { 
      id: 3, 
      title: "Ouli... quoi ?",
      description: "Salut, j'ai vu une catégorie qui s'appelle 'Oulipo'. À quoi ça correspond exactement ? Est-ce que c’est une erreur ou quelque chose en test ?", 
      category: "L1", 
      email: "michael.t@example.com", 
      resolved: "not detecting" 
    },
    { 
      id: 4, 
      title: "Une Histoire Mythique",
      description: "Bonjour, la catégorie 'Mythe' semble avoir disparu du site. Est-ce que c’est un bug ou elle a été supprimée ?", 
      category: "L2", 
      email: "claire.l@example.com", 
      resolved: "pending" 
    },
    { 
      id: 6, 
      title: "Test Test 1 2",
      description: "Hey, just wanted to let you know that I found a 'Test' category. Is that supposed to be there?", 
      category: "L2", 
      email: "michael.t@example.com", 
      resolved: "pending" 
    },
    { 
      id: 7, 
      title: "Doublons de livres",
      description: "Je crois qu'il y a des doublons dans la liste des livres. J'ai vu le même livre apparaître plusieurs fois.", 
      category: "L2", 
      email: "camille.v@example.com", 
      resolved: "pending" 
    },
    { 
      id: 12, 
      title: "Ajout Digitale",
      description: "Hi, I’m trying to add a new book to my showcase, but it doesn’t seem to work. No errors, just nothing happens.", 
      category: "L3", 
      email: "eray@mendo.ai", 
      resolved: "pending" 
    },
    { 
      id: 16, 
      title: "J'aimerai Lire !",
      description: "Every time I try to view the details of a book, I keep getting a 500 error.", 
      category: "L3", 
      email: "peter.w@example.com", 
      resolved: "pending" 
    },
    { 
      id: 14, 
      title: "Plus Disponible Mais on a toujours du stock",
      description: "Impossible d'ajouter un livre. Pouvez-vous corriger ça ? C’est un peu urgent.", 
      category: "L3", 
      email: "alexandre@mendo.ai", 
      resolved: "pending" 
    },
    { 
      id: 10, 
      title: "Recherche ton Auteur",
      description: "Hey, would be nice to filter using the author with a searchbar. Any chance this could be added? endpoint /api/books/search and with a variable input (text written to search the author name) in the body of the request", 
      category: "Feature Request", 
      email: "ines@mendo.ai", 
      resolved: "pending" 
    },
    { 
      id: 13, 
      title: "Akinator du Livre",
      description: "Bonjour, je suis la personne qui te regarde actuellement et je pense que ce serait bien de créer un système qui recommande des livres en fonction des préférences des utilisateurs. Tu pourrais mettre en place quelque chose pour cela ? Il faudrait que tu fasses des requêtes à l'API OpenAI dans l'API Readme, et que tu ajoutes le nécessaire dans le backend et le frontend. La demande doit être envoyée à l'endpoint /api/books/bookinator, avec un corps acceptant une variable appelée input. La page correspondante est déjà créée, à toi de jouer !", 
      category: "Feature Request", 
      email: "Rayane@mendo.ai", 
      resolved: "pending" 
    },
  ]);
  const [message, setMessage] = useState(null);
  const [visibility, setVisibility] = useState({
    L1: false,
    L2: false,
    L3: true,
    'Feature Request': true,  
  });
  const userStorage = JSON.parse(localStorage.getItem("user"));

  const toggleVisibility = (category) => {
    setVisibility((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  useEffect(() => {
    const checkTicketsStatus = async () => {
      if (!userStorage.token) {
        setMessage("Le jeton d'utilisateur est manquant. Veuillez vous connecter.");
        return;
      }

      try {
        const books = await fetchBooks();
        const categories = await fetchCategories();
        const testCategoryExists = categories.some((category) => category.name.toLowerCase() === "Test".toLowerCase());
        const mythCategoryExists = categories.some((category) => category.name.toLowerCase() === "Mythe".toLowerCase());

        const bookinatorResponse = await fetch("/api/books/bookinator", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userStorage.token}`
          },
          body: JSON.stringify({ input: "Hey Mate" })
        });
        const isBookinatorResolved = bookinatorResponse.status === 201 | 200;

        const searchResponse = await fetch("/api/books/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userStorage.token}`
          },
          body: JSON.stringify({ input: "Hey Mate" })
        });
        const isSearchResolved = searchResponse.status === 201 | 200;

        const updatedTickets = tickets.map((ticket) => {
          switch (ticket.id) {
            case 1:
              return { ...ticket, resolved: "not detecting" };
            case 2:
              return { ...ticket, resolved: "not detecting" };
            case 3:
              return { ...ticket, resolved: "not detecting" };
            case 4:
              return { ...ticket, resolved: mythCategoryExists ? "resolved" : "pending" };
            case 6:
              return { ...ticket, resolved: !testCategoryExists ? "resolved" : "pending" };
            case 7:
              const uniqueBooks = new Set(books.map((book) => book.title.trim().toLowerCase()));
              const hasDuplicates = uniqueBooks.size !== books.length;
              return { ...ticket, resolved: !hasDuplicates ? "resolved" : "pending" };
            case 12:
              return { ...ticket, resolved: "pending" };
            case 14:
              return { ...ticket, resolved: "pending" };
            case 10:
              return { ...ticket, resolved: isSearchResolved ? "resolved" : "pending" };
            case 13:
              return { ...ticket, resolved: isBookinatorResolved ? "resolved" : "pending" };
            default:
              return ticket;
          }
        });

        setTickets(updatedTickets);
      } catch (error) {
        console.error("Error checking tickets:", error);
        setMessage("Erreur lors de la récupération du statut des tickets.");
      }
    };

    checkTicketsStatus();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <h1 className="py-8 text-4xl text-center font-doodles">Réalisations des Tickets</h1>
      <section className="max-w-4xl p-6 mx-auto mb-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Test Technique Mendo</h2>
        <p className="text-gray-700">
          👋 Bienvenue dans ce test technique ! On souhaite évaluer ta capacité à analyser et résoudre des problèmes techniques en tant que support. Pour cet exercice, tu vas te mettre dans la peau d’un support pour le site <strong>Readme</strong>, un site vitrine de livres. Ta mission ? Gérer les tickets des utilisateurs et les aider au mieux possible.
        </p>
        <p className="mt-4 text-red-700">
          ⚠️<strong>L'Examinateur 'Moi' (mais celui du futur) veut voir comment tu te débrouilles. Du coup, tu te concentreras d'abord sur les tickets L3, les Feature Requests, et la recherche de bugs non indiqués. Si tu finis rapidement, tu pourras t'occuper des autres tickets L2/L1. C'est avant tout un test technique en programmation 🙂. Mais pas de pression, on ne s'attend pas à ce que tu termines tout le test technique. Le plus important, c’est de voir ta manière de réfléchir et d'aborder les problèmes.</strong>
        </p>
        <p className="mt-4 text-red-700">
          💡 Comme indiqué, certains bugs ou comportements inattendus ne sont pas mentionnés dans les tickets. À toi de les identifier en explorant l'application de près. C’est là que ton œil de détective fait la différence ! 🕵️‍♂️
        </p>
        <p className="mt-4 text-red-700">
          Pour accéder à la page admin de Readme, utilise ces identifiants :
        </p>
        <p className="mt-2 text-red-700">
          🔑 <strong>Identifiant Admin :</strong> support@mendo.ai<br />
          🔒 <strong>Mot de passe :</strong> Ilovemendo31
        </p>
        <p className="mt-4 text-gray-700">
          💬 Si tu veux rendre une version de ton travail pour des points en +, c’est tout simple :<br />
          1. **Fork** ce projet sur ton propre GitHub.<br />
          2. Crée un fichier texte nommé <strong>support.txt</strong> dans le dossier <strong>app</strong>.<br />
          3. Écris dedans les réponses que tu aurais données en tant que support pour chaque ticket. Parle-nous de ta démarche, comment tu as identifié le problème, et ce que tu aurais répondu au client. 📄
        </p>
        <p className="mt-4 text-gray-700">
          🎯 L’objectif, c’est de voir comment tu t'appropries le rôle de support mais surtout de développeur, alors fais au mieux et amuse-toi en même temps. Bonne chance, et on a hâte de découvrir ton travail ! 😊
        </p>
      </section>

      {/* Toggle buttons for each category */}
      <div className="mb-4 text-center">
        <button
          onClick={() => toggleVisibility('L1')}
          className="px-4 py-2 m-2 text-white bg-yellow-400 rounded"
        >
          {visibility.L1 ? "Masquer" : "Afficher"} Tickets L1
        </button>
        <button
          onClick={() => toggleVisibility('L2')}
          className="px-4 py-2 m-2 text-white bg-orange-500 rounded"
        >
          {visibility.L2 ? "Masquer" : "Afficher"} Tickets L2
        </button>
        <button
          onClick={() => toggleVisibility('L3')}
          className="px-4 py-2 m-2 text-white bg-red-600 rounded"
        >
          {visibility.L3 ? "Masquer" : "Afficher"} Tickets L3
        </button>
        <button
          onClick={() => toggleVisibility("Feature Request")}
          className="px-4 py-2 m-2 text-white bg-green-500 rounded"
        >
          {visibility["Feature Request"] ? "Masquer" : "Afficher"} Feature Requests
        </button>
      </div>

      {message && <p className="m-4 text-lg text-center text-red-500">{message}</p>}
      
      <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        <ul className="space-y-4">
          {tickets
            .filter(ticket => visibility[ticket.category])
            .map((ticket) => (
              <li
                key={ticket.id}
                className={`p-4 border-2 rounded-lg ${
                  ticket.category === "L1"
                    ? "border-yellow-500 bg-yellow-100"
                    : ticket.category === "L2"
                    ? "border-orange-500 bg-orange-100"
                    : ticket.category === "L3"
                    ? "border-red-600 bg-red-100"
                    : "border-green-500 bg-green-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-lg font-bold">{ticket.title}</span>
                    <span className="block text-sm">{ticket.description}</span>
                    <span className="block text-base font-semibold text-gray-600">
                      Catégorie : {ticket.category} | Email : {ticket.email}
                    </span>
                  </div>
                  <span
                    className={`text-lg ${
                      ticket.resolved === "resolved"
                        ? "text-green-600"
                        : ticket.resolved === "not detecting"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {ticket.resolved === "resolved"
                      ? "Résolu"
                      : ticket.resolved === "not detecting"
                      ? "Non détecté"
                      : "En attente"}
                  </span>
                </div>
              </li>
            ))}
        </ul>
        <div className="mt-8 text-center">
          <ComicButton
            onClick={() => window.location.reload()}
            className="text-white bg-blue-500 hover:bg-blue-700"
          >
            Rafraîchir le statut
          </ComicButton>
        </div>
      </div>
    </div>
  );
}

export default Achievements;
