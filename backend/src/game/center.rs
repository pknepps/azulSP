use crate::game::tile::{ColorDoesNotExist, Color, Tile};

/// The center of the play area which contains the leftover tiles from
/// factories as well as the first-player token until chosen from.
pub struct Center {
    tiles: Vec<Tile>,
}

impl Center {
    /// Creates a new center with no colored-tiles and one first_player_tile.
    pub fn new() -> Center {
        let mut tiles: Vec<Tile> = Vec::new();
        tiles.push(Tile::FirstPlayer);
        Center {
            tiles,
        }
    }

    /// Discards the given tile to this Center.
    pub fn discard(&mut self, tile: Tile) {
        self.tiles.push(tile);
    }

    /// Picks all tiles of the given color, adding on the first-player tile,
    /// if it exists.
    fn pick(&mut self, tile: &Color) -> Result<Vec<Tile>, ColorDoesNotExist> {
        let mut match_cnt = 0;
        let mut tiles = Vec::new();
        for i in 0..self.tiles.len() {
            if let Tile::Colored(color) = self.tiles[i - match_cnt] {
                if color != *tile {
                    continue;
                }
            }
            tiles.push(self.tiles.remove(i));
            match_cnt += 1;
        }
        if tiles.is_empty() || (tiles[0] == Tile::FirstPlayer && match_cnt == 1) {
            return Err(ColorDoesNotExist);
        }
        Ok(tiles)
    }
}