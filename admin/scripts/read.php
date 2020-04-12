<?php

function getAll($tbl)
{
    $pdo = Database::getInstance()->getConnection();
    $queryAll = 'SELECT * FROM ' . $tbl;
    $results = $pdo->query($queryAll);

    if ($results) {
        return $results->fetchALL(PDO::FETCH_ASSOC);
    } else {
        return 'There was a problem accessing this info';
    }
}

function getSingleMovie($tbl, $col, $id)
{
    //TODO: finish the function based on getAll, this time only return
    // one movie's fields

    $pdo = Database::getInstance()->getConnection();
    // $query = 'SELECT * FROM '.$tbl.' WHERE '$col' = '.$id;
    $query = "SELECT * FROM $tbl WHERE $col = $id";
    $results = $pdo->query($query);

    if ($results) {
        return $results;
    } else {
        return 'There was a problem accessing this info';
    }

}

function getMoviesByfilter($args)
{
    $pdo = Database::getInstance()->getConnection();

    $filterQuery = 'SELECT * FROM ' . $args['tbl'] . ' AS t, ' . $args['tbl2'] . ' AS t2, ' . $args['tbl3'] . ' AS t3' . $args['tbl4'] . ' AS t4';
    $filterQuery .= ' WHERE t.' . $args['col'] . ' = t4.' . $args['col'];
    $filterQuery .= ' AND t2.' . $args['col2'] . ' = t4.' . $args['col2'];
    $filterQuery .= ' AND t3.' . $args['col3'] . ' = t4.' . $args['col3'];
    $filterQuery .= ' AND t2.' . $args['col4'] . ' = "' . $args['category'] . '"';
    $filterQuery .= ' AND t3.' . $args['col5'] . ' = "' . $args['genre'] . '"';

    $results = $pdo->query($filterQuery);

    // echo $filterQuery;
    // exit;

    if ($results) {
        return $results;
    } else {
        return 'There was a problem accessing this info';
    }
}
