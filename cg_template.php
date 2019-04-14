<a href="<?= $candidate["picture"] ?>"><img class="alignright wp-image-3400" src="<?= $candidate["picture"] ?>" alt="<?= $candidate["name"] ?>" width="400" height="400" /></a>
<h4><?= $candidate["committee"][$committee]["position"] ?>. <?= $candidate["name"] ?></h4>
<?= $candidate["age"] ?> Jahre alt | <?= $candidate["family"] ?> | <?= $candidate["job"] ?><br />
<br />
<address>
    <?= $candidate["statement"] ?>
</address>
<strong>Kandidiert für:</strong>
<br />
<ul>
    <?php
    if($candidate["committee"]["kt"]["active"]) { echo "<li>Kreistag (Listenplatz " . $candidate["committee"]["kt"]["position"] . ")</li>"; }
    if($candidate["committee"]["gr"]["active"]) { echo "<li>Gemeinderat (Listenplatz " . $candidate["committee"]["gr"]["position"] . ")</li>"; }
    if($candidate["committee"]["or"]["active"]) { echo "<li>Ortschaftsrat (Listenplatz " . $candidate["committee"]["or"]["position"] . ")</li>"; }
    ?>
</ul>
<br />