use crate::game::Game;
use axum::{routing::get, Router};
use axum::http::StatusCode;
use axum::response::{IntoResponse, Response};
use hyper;

pub mod game;

pub async fn start() {
    let game = Game::build(0, vec!["Preston", "Jude", "Michelle", "Ben"]).unwrap();

    let app = Router::new();

    let listener = tokio::net::TcpListener::bind("127.0.0.1:8080")
        .await
        .unwrap();
    println!("listening on {}", listener.local_addr().unwrap());
    println!("{}", game.read_as_json().await.unwrap());
    axum::serve(listener, app).await.unwrap();
}