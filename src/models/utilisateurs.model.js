const database = require('../db/db-connection.js');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const UtilisateurConstructor = function(utilisateur) {
    this.id = utilisateur.id;
    this.identifiant = utilisateur.identifiant;
    this.mot_de_passe = utilisateur.mot_de_passe;
    this.pseudo = utilisateur.pseudo;
};

// Récupérer tous les utilisateurs (sans le mot de passe)
getAllUtilisateurs = (result_bdd_request) => {
    database.query(
        "SELECT id, identifiant, pseudo FROM utilisateurs",
        (error, response) => {
            if (error) {
                result_bdd_request(error);
                return;
            }
            result_bdd_request(null, response);
        }
    );
};

// Récupérer un utilisateur par son id (sans le mot de passe)
getUtilisateurById = (id, result_bdd_request) => {
    database.query(
        "SELECT id, identifiant, pseudo FROM utilisateurs WHERE id = $1",
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

// Créer un utilisateur (avec hachage du mot de passe)
createUtilisateur = async (utilisateur, result_bdd_request) => {
    try {
        const { identifiant, mot_de_passe, pseudo } = utilisateur;
        const hashedPassword = await bcrypt.hash(mot_de_passe, SALT_ROUNDS);

        database.query(
            "INSERT INTO utilisateurs (identifiant, mot_de_passe, pseudo) VALUES ($1, $2, $3) RETURNING id, identifiant, pseudo",
            [identifiant, hashedPassword, pseudo || null],
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
        const { identifiant, mot_de_passe, pseudo } = utilisateur;

        let query;
        let params;

        if (mot_de_passe) {
            const hashedPassword = await bcrypt.hash(mot_de_passe, SALT_ROUNDS);
            query = "UPDATE utilisateurs SET identifiant = $1, mot_de_passe = $2, pseudo = $3 WHERE id = $4 RETURNING id, identifiant, pseudo";
            params = [identifiant, hashedPassword, pseudo || null, id];
        } else {
            query = "UPDATE utilisateurs SET identifiant = $1, pseudo = $2 WHERE id = $3 RETURNING id, identifiant, pseudo";
            params = [identifiant, pseudo || null, id];
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
            "SELECT * FROM utilisateurs WHERE pseudo = $1",
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
loginUtilisateur = async (identifiant, mot_de_passe, result_bdd_request) => {
    try {
        database.query(
            "SELECT * FROM utilisateurs WHERE identifiant = $1",
            [identifiant],
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
                result_bdd_request(null, match ? { id: utilisateur.id, identifiant: utilisateur.identifiant, pseudo: utilisateur.pseudo } : false);
            }
        );
    } catch (error) {
        result_bdd_request(error);
    }
};

// Supprimer un utilisateur
deleteUtilisateurById = (id, result_bdd_request) => {
    database.query(
        "DELETE FROM utilisateurs WHERE id = $1 RETURNING id, identifiant, pseudo",
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
    getAllUtilisateurs,
    getUtilisateurById,
    createUtilisateur,
    updateUtilisateurById,
    deleteUtilisateurById,
    loginUtilisateur,
    loginByPseudo
};
