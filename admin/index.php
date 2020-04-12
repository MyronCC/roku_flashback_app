<?php
require_once '../load.php';

if(isset($_GET['media'])){
    $tbl ="tbl_" . trim($_GET['media']);
    // echo $tbl;

}

if (isset($_GET['category']) && isset($_GET['genre'])) {
    //Filter
    $args = array (
    'tbl' => 'tbl_movies',
    'tbl2' => 'tbl_category',
    'tbl3' => 'tbl_genre',
    'tbl4' => 'tbl_mov_cate',
    'col'  => 'movies_id',
    'col2' => 'category_id',
    'col2' => 'genre_id',
    'col3' => 'category_name',
    'col4' => 'genre_name',
    'category' => $_GET['category'],
    'genre' => $_GET['genre']

    );  
    $results = getMoviesByFilter($args);
    echo json_encode($results->fetchAll(PDO::FETCH_ASSOC));
} else {
    $results = getAll($tbl);
    echo json_encode($results);
}
