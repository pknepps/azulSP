use crate::game::bag::Bag;
use crate::game::tile::{ColoredTile, Tile};

pub struct Board {
    pattern: Pattern,
    wall: Wall,
    floor: Vec<Box<dyn Tile>>,
    bag: Bag,
}

impl Board {

}

struct Pattern {

}

struct Wall {

}