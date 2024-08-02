use crate::game::Game;

pub mod game;

pub fn start() {
    let game = Game::build(0, vec!["Preston", "Jude", "Michelle", "Ben"]);

}