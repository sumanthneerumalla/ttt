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
