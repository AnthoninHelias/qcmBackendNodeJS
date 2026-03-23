const utilisateurModel = require('../models/utilisateurs.model');

// Récupérer un utilisateur par son id (mot de passe requis)
getUtilisateurById = (request, response) => {
    const { id, motdepasse } = request.params;

    utilisateurModel.getUtilisateurById(id, motdepasse, (error, utilisateur) => {
        if (error) {
            return response.status(500).send({
                message: error.message || "Erreur lors de la récupération de l'utilisateur."
            });
        }
        if (!utilisateur) {
            return response.status(401).send(false);
        }
        response.send(utilisateur);
    });
};

// Créer un utilisateur
createUtilisateur = async (request, response) => {
    if (!request.body) {
        return response.status(400).send({
            message: "Le corps de la requête ne peut pas être vide."
        });
    }

    const { mot_de_passe, pseudo } = request.body;

    if (!pseudo || !mot_de_passe) {
        return response.status(400).send({
            message: "Le pseudo et le mot de passe sont obligatoires."
        });
    }

    const utilisateur = new utilisateurModel.UtilisateurConstructor({
        mot_de_passe,
        pseudo
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
    const { pseudo, mot_de_passe } = request.body;

    if (!pseudo || !mot_de_passe) {
        return response.status(400).send({
            message: "Le pseudo et le mot de passe sont obligatoires."
        });
    }

    utilisateurModel.loginUtilisateur(pseudo, mot_de_passe, (error, utilisateur) => {
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
    getUtilisateurById,
    createUtilisateur,
    updateUtilisateurById,
    deleteUtilisateurById,
    loginUtilisateur,
    loginByParams
};
