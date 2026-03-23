const database = require('../db/db-connection.js');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const UtilisateurConstructor = function(utilisateur) {
    this.id = utilisateur.id;
    this.mot_de_passe = utilisateur.mot_de_passe;
    this.pseudo = utilisateur.pseudo;
};

// Récupérer un utilisateur par son id (mot de passe requis)
getUtilisateurById = async (id, mot_de_passe, result_bdd_request) => {
    try {
        database.query(
            "SELECT * FROM questionnaire.utilisateurs WHERE id = $1",
            [id],
            async (error, response) => {
                if (error) {
                    result_bdd_request(error);
                    return;
                }
                if (response.rows.length === 0) {
                    result_bdd_request(null, null);
                    return;
                }
                const utilisateur = response.rows[0];
                const match = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
                if (!match) {
                    result_bdd_request(null, null);
                    return;
                }
                result_bdd_request(null, { id: utilisateur.id, pseudo: utilisateur.pseudo });
            }
        );
    } catch (error) {
        result_bdd_request(error);
    }
};

// Créer un utilisateur (avec hachage du mot de passe)
createUtilisateur = async (utilisateur, result_bdd_request) => {
    try {
        const { mot_de_passe, pseudo } = utilisateur;
        const hashedPassword = await bcrypt.hash(mot_de_passe, SALT_ROUNDS);

        database.query(
            "INSERT INTO questionnaire.utilisateurs (mot_de_passe, pseudo) VALUES ($1, $2) RETURNING id, pseudo",
            [hashedPassword, pseudo || null],
            (error, response) => {
                if (error) {
                    result_bdd_request(error);
                    return;
                }
                result_bdd_request(null, response);
            }
        );
    } catch (error) {
        result_bdd_request(error);
    }
};

// Mettre à jour un utilisateur
updateUtilisateurById = async (id, utilisateur, result_bdd_request) => {
    try {
        const { mot_de_passe, pseudo } = utilisateur;

        let query;
        let params;

        if (mot_de_passe) {
            const hashedPassword = await bcrypt.hash(mot_de_passe, SALT_ROUNDS);
            query = "UPDATE questionnaire.utilisateurs SET mot_de_passe = $1, pseudo = $2 WHERE id = $3 RETURNING id, pseudo";
            params = [hashedPassword, pseudo || null, id];
        } else {
            query = "UPDATE questionnaire.utilisateurs SET pseudo = $1 WHERE id = $2 RETURNING id, pseudo";
            params = [pseudo || null, id];
        }

        database.query(query, params, (error, response) => {
            if (error) {
                result_bdd_request(error);
                return;
            }
            result_bdd_request(null, response);
        });
    } catch (error) {
        result_bdd_request(error);
    }
};

// Connexion par pseudo (params URL)
loginByPseudo = async (pseudo, mot_de_passe, result_bdd_request) => {
    try {
        database.query(
            "SELECT * FROM questionnaire.utilisateurs WHERE pseudo = $1",
            [pseudo],
            async (error, response) => {
                if (error) {
                    result_bdd_request(error);
                    return;
                }
                if (response.rows.length === 0) {
                    result_bdd_request(null, false);
                    return;
                }
                const utilisateur = response.rows[0];
                const match = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
                result_bdd_request(null, match);
            }
        );
    } catch (error) {
        result_bdd_request(error);
    }
};

// Connexion d'un utilisateur
loginUtilisateur = async (pseudo, mot_de_passe, result_bdd_request) => {
    try {
        database.query(
            "SELECT * FROM questionnaire.utilisateurs WHERE pseudo = $1",
            [pseudo],
            async (error, response) => {
                if (error) {
                    result_bdd_request(error);
                    return;
                }
                if (response.rows.length === 0) {
                    result_bdd_request(null, false);
                    return;
                }
                const utilisateur = response.rows[0];
                const match = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
                result_bdd_request(null, match ? { id: utilisateur.id, pseudo: utilisateur.pseudo } : false);
            }
        );
    } catch (error) {
        result_bdd_request(error);
    }
};

// Supprimer un utilisateur
deleteUtilisateurById = (id, result_bdd_request) => {
    database.query(
        "DELETE FROM questionnaire.utilisateurs WHERE id = $1 RETURNING id, pseudo",
        [id],
        (error, response) => {
            if (error) {
                result_bdd_request(error);
                return;
            }
            result_bdd_request(null, response);
        }
    );
};

module.exports = {
    UtilisateurConstructor,
    getUtilisateurById,
    createUtilisateur,
    updateUtilisateurById,
    deleteUtilisateurById,
    loginUtilisateur,
    loginByPseudo
};
