# merge-sort-sandbox

There are two ways that I can see to implement step-by-step execution.
    1. Use timeouts or something to delay the execution of each loop and stop it when you click pause
      Pros:
      - Potentially easier to implement
      Cons:
      - Not as flexible. Harder to undo steps if user wants to go back a step
      - Execution of the algorithm is coupled to the display of the algorithm state
    
    2. Create a list of display operations which can be navigated by the user.
      Pros:
      - Flexible. Execution is not coupled to display so it will be easy to allow user to advance, reverse, and navigate to any step at any time
      - Extensible. The display interface can be used by other algorithms to generate interactive displays.
      Cons:
      - Potentially more difficult to implement

    I will proceed with option 2. In order to do this I want to create a display interface (set of functions) which the algorithm can generate. 