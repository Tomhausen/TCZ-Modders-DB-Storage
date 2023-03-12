function displayUserData() {
    user_name = database.getTextValue("NAME")
    user_age = database.getNumberValue("AGE")
    is_alive = database.getBoolValue("IS_ALIVE")
    game.showLongText(database.toLines(["Player: " + user_name, "Age: " + user_age, "Is Alive: " + is_alive]), DialogLayout.Full)
}

function displayStoredScores() {
    scores = database.toLine("Number of scores: " + convertToText(database.listCount("SCORES")))
    for (let index = 0; index <= database.listCount("SCORES") - 1; index++) {
        score_at_index = database.toLine(convertToText(database.listGetValueAt("SCORES", index)))
        scores = "" + scores + score_at_index
    }
    game.showLongText(scores, DialogLayout.Full)
}

let score_at_index = ""
let scores = ""
let user_age = 0
let user_name = ""
let is_alive = true

if (!(database.exists())) {
    game.splash("Database not found", "Filling with sample data")
    database.setTextValue("NAME", "JOHN")
    database.setBoolValue("IS_ALIVE", true)
    database.setNumberValue("AGE", 30)
    database.listAddValue("SCORES", 1058)
    database.listAddValue("SCORES", 50)
    database.listAddValue("SCORES", 30)
}
displayUserData()
displayStoredScores()
if (database.listCount("SCORES") > 0 && game.ask("TEST DELETING A LIST", "Delete scores now ?")) {
    database.deleteList("SCORES")
    displayStoredScores()
}
if (game.ask("TEST DELETING DATABASE", "Do you want to delete it?")) {
    database.deleteAll()
}
if (!(database.exists())) {
    game.splash("Database removed from flash", "Restar console")
} else {
    game.splash("Database in flash memory", "Restar console to test")
}
