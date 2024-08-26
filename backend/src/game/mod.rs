use crate::game::board::Board;
use crate::game::factory::Factory;
use crate::game::bag::Bag;
use crate::game::center::Center;
use serde::{Deserialize, Serialize};

pub mod bag;
pub mod board;
pub mod center;
pub mod factory;
pub mod tile;

//Todo: impl Error
#[derive(Debug)]
pub enum GameCreationError {
    TooManyPlayers,
    NotEnoughPlayers,
}

/// Represents an individual game of azul.
#[derive(Serialize, Deserialize)]
pub struct Game {
    id: usize,
    bag: Bag,
    players: Vec<Player>,
    factories: Vec<Factory>,
    center: Center,
}

impl Game {
    /// Creates a new game from the given player id's up to a maximum of
    /// 4 players.
    pub fn build(game_id: usize, player_ids: Vec<u32>) -> Result<Self, GameCreationError> {
        if player_ids.len() < 2 {
            return Err(GameCreationError::NotEnoughPlayers);
        }
        if player_ids.len() > 4 {
            return Err(GameCreationError::TooManyPlayers);
        }

        let id = game_id;

        let mut bag = Bag::new();

        // Should perform a database query, but for now, just creates new players
        let mut players = Vec::new();
        // todo, replace temp_names with database query.
        let temp_names = ["Preston", "Jude", "Michelle", "Ben"];
        for id in player_ids {
            players.push(Player::new(id, temp_names[id as usize], Board::new()));
        }

        let mut factories = Vec::new();
        for _ in 0..(2 * players.len() + 1) {
            factories.push(Factory::new(&mut bag));
        }

        let center = Center::new();

        Ok(Game {
            id,
            bag,
            players,
            factories,
            center,
        })
    }

    pub fn players(&self) -> &Vec<Player> {
        &self.players
    }

    pub fn factories(&self) -> &Vec<Factory> {
        &self.factories
    }

    pub fn center(&self) -> &Center {
        &self.center
    }
}


/// A representation of a player which is stored in the database.
#[derive(Serialize, Deserialize)]
pub struct Player {
    id: u32,
    name: String,
    board: Board,
}

impl Player {
    /// Creates a new player from the given id and board.
    pub fn new(id: u32, name: &str, board: Board) -> Self {
        Player {
            id,
            name: String::from(name),
            board,
        }
    }
}