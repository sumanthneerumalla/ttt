# 03/04/23
- resuming win detection with the algorithm from stack overflow
- detects wins now, can render and play a game till a win is detected
- added conditional rendering of X or O depending on the moves stored in the board
- need to display the winner on the tic tac toe component next, and send updates over sockets
- after that i can try and finalize auth

# 02/29/23
- a little refactoring before i start writing the game state back into the db
- going to use an upsert to update a game id if provided, otherwise creates a new game
- need to finish function that checks if a round is completed, or implement a countdown for rounds
- found this nifty little technique for win detection: https://stackoverflow.com/a/18668901

# 02/29/23
- I need to construct a gameMove object again on the createMove endpoint and validate it against the game object based on game id
    - sending each button press using an event handler that calls a trpc mutate now. sends a gameMove obj
    - reconstructing that on the backend now
    - took a long time to get rid of annoying eslint pickiness, just added an exception and stuck with keeping gameState as string
    - i can validate whether the sent in move is valid or not now
- next steps are to submit the move and update the new gameState accordingly. After that...deal with supporting a 3 games alternating the starting player. Need either game room or tournament data model

# 02/28/23
-default game object lets test user play a game
-Things i should be able to do now:
    - view any game object. I should create a page that takes a game id and renders that game from the database
    - submit a game move to any game, but apply it only after validation. I'll do this one first then i'm free to implement the other thing.
        - after i do this i need to look into getting the subscription to work. Might get complicated bc i dont know if each client session has its own separate subscription. will deal with it when it comes time
        - Spent way too much time trying to infer zod schema from typescript GameMove definition automatically. I'll leave that as is on the trpc endpoint and instead just create another GameMove object that i can pass around as needed. Why cant zod just take the interface or type definition instead of making me redefine in zod again??!
        - I can fetch the game object now
            - but instead of storing the game state as a json string, i should just try and store it as a gameObject to begin with
            - will do this when i get back


# 02/27/23
- now that i have game objects on the db, I can check if a user sending a move is allowed to make a move for that game or not
- later i'll revisit this game creation endpoint and create a separate page that lets me create custom games. That page will show who's online and create a match with that player. Will need to add some authorization where one of the players in the new game must be the player that created the game request
- I should be able to implement a full game for this next leg of the project
- Didn't make much progress on these ideas

# 02/26/23
- continuing to work on db model and approach.
    - i need to made a db table that had game id with username array in it
    - i might as well store the game object instead of just the usernames
        - i'm storing the id with a json game object now, keeping the prisma structure simple and i can just do json validation using zod or something
        - next step is to see how posts are retrieved, and retrieve a the game object when a move is submitted
            - added unique constrainta and timestamp columns
            - quick detour to understand relations on schema definitions
                - did this, i think i can avoid it by sticking with the json model
            - then i'll create an endpoint to create a new game
                -done
        - noticed that i need to convert the createMove endpoint into an authed procedure
            -done
    - I have an endpoint that lets me create new games now
        


# 02/23/23

- got up to speed with what i was doing last time. It looks like I updated the game move type that i was sending to the back end. I need to process that object and then store it in a database.
- Need to log in to get moves on the backend
- i have a button that makes a move and sends it to the backend, i need to link that to the buttons on the board
- did that, now button presses go to the backend.
- backend needs to see if the move is valid and then update the game after checking if the game id belongs to the user that submitted the move
- the data base should store a table of games with game id and the state of the game
- I need an endpoint to do this where it creates a table with game id. This will need 
    - a table associating game ids with an array of usernames
    - i need to figure out how to do this with prisma
        -i created a model, need to keep iterating on this
