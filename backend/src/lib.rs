use crate::game::Game;
use axum::{routing::get, Router};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use hyper;
use lazy_static::lazy_static;
use std::sync::Mutex;
use axum_macros::debug_handler;

pub mod game;

lazy_static! {
    static ref GAME: Mutex<Game> = Mutex::new(Game::build(0, vec!["Preston", "Jude", "Michelle", "Ben"]).unwrap());
}

pub async fn start() {
    let app = Router::new().route("/game", get(get_state));

    let listener = tokio::net::TcpListener::bind("127.0.0.1:8080")
        .await
        .unwrap();
    println!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

#[debug_handler]
pub async fn get_state() -> impl IntoResponse {
    let json = GAME.lock().unwrap().read_as_json();
    match json {
        Ok(json) => (StatusCode::OK, json).into_response(),
        Err(error) => (StatusCode::INTERNAL_SERVER_ERROR, error.to_string()).into_response(),
    }
}