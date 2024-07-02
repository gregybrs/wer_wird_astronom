# WER WIRD ASTRONAUT?
## Projekt Dokumentation


## Idee
Meine Idee, war es eine 'Wer wird Milllionär' Quiz, aber im Thema Astronomie zu gestalten.
Die Funktionsweise ist identisch mit einer Fragen, 4 Antwortmöglichekieten und diversen Jokern.
Das Desgin is an das Orgianl angelegt, jedoch leicht verändert und ich habe mich noch für eine zweite Seite entschieden, in der man alle Fragen mit Antworten nochmals ansehen kann.

## Umsetzung
 Nachdem das grobe Konzept mit ersten Entwürfen feststand, hab ich angefangen mit der Einbindung einer API.
**API**
https://platform.openai.com/docs/api-reference/completions/create?lang=node.js
Die API generiert mit ChatGTP multiple choice Fragen mit 4 Antwortmöglichkeiten.
Und für den Publikumsjoker einen Tipp der dem Spieler bei der Beantwortung der Frage helfen soll.

**Progress Bar**
Das bekannte Fragenranking, wollte ich natürlich auch einbinden. Da es bei mir nicht um Geld geht, habe ich mich für eine Art Progressbar entscheiden, inder eine Rakete je nach Frage höher fliegt udn bei falscher Beantwortung abstürzt. 
Sie durchläuft folgende Stadien: 
*"Anfänger",*
*"Neuling",*
*"Lernender",*
*"Entdecker",*
*"Kenner",*
*"Enthusiast",*
*"Forscher",*
*"*Analytiker",*
*"Spezialist",*
*"Experte",*
*"Meister",*
*"Gelehrter",*
*"Pionier",*
*"Veteran",*
*"Astronaut."*

**Joker**
Um den Spielspaß weiter zu steigern, durften die Joker natürlich aiuch nicht fehlen. 
Deshlab gibt es wie im Orginal mehrere Joker.
Diese umfassen, den *Telefonjoker*, *5050 Joker* und *Publikumsjoker*.

**Seiten**
Es gibt 2 Seiten, wie oben beschrieben. Die erste ist das Quizspiel mit Progress Bar und Jokern, hier wird das Spiel durch klicken der fragen durchgearbeiten und bei falsch Beantwortung automatisch neu gestartet. Die zweite Siete ist ein Überblick aller Beantworteten Fragen mit richtiger Lösung für ein besseren Lerneffekt.