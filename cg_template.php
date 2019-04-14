<a href="<?= $candidate["picture"] ?>"><img class="" src="<?= $candidate["picture"] ?>" alt="<?= $candidate["name"] ?>" width="400" height="400" /></a>
<h4><?= $candidate["name"] ?></h4>
<?= $candidate["age"] ?> Jahre alt | <?= $candidate["family"] ?> | <?= $candidate["job"] ?><br />
<br />
<address>
    <?= $candidate["statement"] ?>
</address>
<br />
<strong>Kandidiert für:</strong>
<ul>
    <?php
    if($candidate["gremium"]["kt"]["active"]) { echo "<li>Kreistag (Listenplatz " . $candidate["gremium"]["kt"]["position"] . ")</li>"; }
    if($candidate["gremium"]["gr"]["active"]) { echo "<li>Gemeinderat (Listenplatz " . $candidate["gremium"]["gr"]["position"] . ")</li>"; }
    if($candidate["gremium"]["or"]["active"]) { echo "<li>Ortschaftsrat (Listenplatz " . $candidate["gremium"]["or"]["position"] . ")</li>"; }
    ?>
</ul>
<br />