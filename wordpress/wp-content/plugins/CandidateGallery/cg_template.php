<div class="cg_image">
    <a href="<?= $candidate["picture"] ?>"><img class="alignright wp-image-3400" src="<?= $candidate["picture"] ?>" alt="<?= $candidate["name"] ?>" width="400" height="400" /></a>
    <?php
        if(!empty($candidate["committee"][$committee]["district"])){
    ?>
    <div class="cg_district">
        <p>
            <?= $candidate["committee"][$committee]["district"] ?>
        </p>
    </div>
    <?php } ?>
</div>
<h4><?= $candidate["committee"][$committee]["position"] ?>. <?= $candidate["name"] ?></h4>
<?= $candidate["age"] ?> Jahre alt | <?php echo $candidate["family"] === "" ? "" : $candidate["family"] . " | " ?><?= $candidate["job"] ?><br />
<br />
<address>
    <?= $candidate["statement"] ?>
</address>
<?php
if($committee !== "kt") {
?>
<strong>Kandidiert für:</strong>
<br />
<ul>
    <?php
    if($candidate["committee"]["kt"]["active"]) { echo "<li>Kreistag (Listenplatz " . $candidate["committee"]["kt"]["position"] . ")</li>"; }
    if($candidate["committee"]["gr"]["active"]) { echo "<li>Gemeinderat (Listenplatz " . $candidate["committee"]["gr"]["position"] . ")</li>"; }
    if($candidate["committee"]["or"]["active"]) {
        echo "<li>Ortschaftsrat (Listenplatz " . $candidate["committee"]["or"]["position"] . ")" .
            (!empty($candidate["committee"]["or"]["list"]) ? " - " . $candidate["committee"]["or"]["list"] : "") . "</li>";
    }
    ?>
</ul>
<?php } ?>
<br />