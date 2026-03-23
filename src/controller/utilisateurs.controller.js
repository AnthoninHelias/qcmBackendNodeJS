const utilisateurModel = require('../models/utilisateurs.model');

// Récupérer tous les utilisateurs
getAllUtilisateurs = (request, response) => {
    utilisateurModel.getAllUtilisateurs((error, data) => {
        if (error)
            response.status(500).send({
                message: error.message || "Erreur lors de la récupération des utilisateurs."
            });
        else
            response.send(data);
    });
};

// Récupérer un utilisateur par son id
getUtilisateurById = (request, response) => {
    utilisateurModel.getUtilisateurById(request.params.id, (error, results) => {
        if (error) {
            response.status(500).send({
                message: error.message || "Erreur lors de la récupération de l'utilisateur."
            });
        } else {
            response.send(results);
        }
    });
};

// Créer un utilisateur
createUtilisateur = async (request, response) => {
    if (!request.body) {
        return response.status(400).send({
            message: "Le corps de la requête ne peut pas être vide."
        });
    }

    const { identifiant, mot_de_passe, pseudo } = request.body;

    if (!identifiant || !mot_de_passe) {
        return response.status(400).send({
            message: "L'identifiant et le mot de passe sont obligatoires."
        });
    }

    const utilisateur = new utilisateurModel.UtilisateurConstructor({
        identifiant,
        mot_de_passe,
        pseudo: pseudo || null
    });

    utilisateurModel.createUtilisateur(utilisateur, (error, data) => {
        if (error)
            response.status(500).send({
                message: error.message || "Erreur lors de la création de l'utilisateur."
            });
        else
            response.status(201).send(data);
    });
};

// Mettre à jour un utilisateur
updateUtilisateurById = async (request, response) => {
    if (!request.body) {
        return response.status(400).send({
            message: "Le corps de la requête ne peut pas être vide."
        });
    }

    utilisateurModel.updateUtilisateurById(
        request.params.id,
        new utilisateurModel.UtilisateurConstructor(request.body),
        (error, data) => {
            if (error)
                response.status(500).send({
                    message: error.message || "Erreur lors de la mise à jour de l'utilisateur."
                });
            else
                response.send(data);
        }
    );
};

// Supprimer un utilisateur
deleteUtilisateurById = (request, response) => {
    utilisateurModel.deleteUtilisateurById(request.params.id, (error, data) => {
        if (error) {
            response.status(500).send({
                message: error.message || "Erreur lors de la suppression de l'utilisateur."
            });
        } else {
            response.send(data);
        }
    });
};

// Connexion d'un utilisateur
loginUtilisateur = (request, response) => {
    const { identifiant, mot_de_passe } = request.body;

    if (!identifiant || !mot_de_passe) {
        return response.status(400).send({
            message: "L'identifiant et le mot de passe sont obligatoires."
        });
    }

    utilisateurModel.loginUtilisateur(identifiant, mot_de_passe, (error, utilisateur) => {
        if (error) {
            return response.status(500).send({
                message: error.message || "Erreur lors de la connexion."
            });
        }
        if (!utilisateur) {
            return response.send(false);
        }
        response.send(true);
    });
};

// Connexion par pseudo + mot de passe en paramètres URL
loginByParams = (request, response) => {
    const { pseudo, motdepasse } = request.params;

    utilisateurModel.loginByPseudo(pseudo, motdepasse, (error, match) => {
        if (error) {
            return response.status(500).send({
                message: error.message || "Erreur lors de la connexion."
            });
        }
        response.send(match);
    });
};

module.exports = {
    getAllUtilisateurs,
    getUtilisateurById,
    createUtilisateur,
    updateUtilisateurById,
    deleteUtilisateurById,
    loginUtilisateur,
    loginByParams
};
