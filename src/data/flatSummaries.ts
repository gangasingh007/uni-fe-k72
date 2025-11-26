// FLAT subject pre-made summaries mapped by resource ID
// These are displayed directly without making API calls

  const flatSummariesRaw = {
    "68c807f447b63605991952bf": {
      title: "Flat-1",
      summary: `## **Flat-1.pdf: Foundations of Automata Theory**
  
  ### **What is Automata Theory? (Analogy)**
  Imagine you're designing a robot to sort colored balls. Automata theory is like asking:
  - What kinds of problems can my robot solve?
  - How complicated or powerful does it need to be?
  - What are the simplest rules it can follow and still do the job?
  
  Automata theory studies abstract computing devices (automata) that model computation and help define what is computable. It underpins computer science areas like compilers, AI, and formal verification. The theory classifies languages (sets of strings) based on the minimal machine needed to recognize them, from simple regular languages to complex recursive ones.
  
  ### **Core Concepts—With Real-Life Examples**
  | Concept   | Explanation                                 | Example/Analogy                                  | Additional Notes |
  |-----------|---------------------------------------------|--------------------------------------------------|------------------|
  | Symbol    | Single basic unit (like a LEGO brick)       | 'a', 'b', '1', '0' from an alphabet              | Symbols are indivisible; they form the building blocks of all strings. In binary systems, symbols are just 0 or 1, mimicking digital bits. |
  | Alphabet  | Collection of symbols (the LEGO set)        | {a, b} or {0, 1}                                 | Finite and non-empty. Real-world: ASCII characters or DNA bases {A, C, G, T}. The size affects the automaton's transition complexity. |
  | String    | Row of LEGO bricks (a sequence)             | "abba" or "101"                                  | Can be empty (ε). Length denoted as \|w\|. Strings represent inputs like code snippets or DNA sequences. |
  | Language  | Box of allowed LEGO models (possible strings)| {"a", "ab", "ba"} (any set of strings)           | Infinite or finite. E.g., all valid Python keywords form a language. Languages are the core objects studied in automata theory. |
  
  *Analogy:* Building words from English letters. The English alphabet is your set, each word (like "DOG") is a string, and the dictionary is the language (all valid words). This mirrors how search engines match queries to documents.
  
  ### **How do We Define Languages?**
  - **Grammar** (rule-book): Like instructions on how to build allowed LEGO structures (strings). Grammars generate languages top-down.
  - **Machines (automata)**: Robots that test if a model (string) is built correctly. Automata recognize languages bottom-up by processing inputs.
  
  *Example:*
  - Alphabet = {a, b}
  - Define a language: "all strings that start with 'a'"
      - Strings: "a", "ab", "aa", "aab", etc.
      - Grammar: S → aT, T → aT \| bT \| ε
      - This language is regular, recognizable by a simple DFA.
  
  Additional Insight: Languages can be infinite (e.g., all even-length strings) yet describable concisely via patterns. Non-regular languages require more power, like memory stacks.
  
  ### **Key Point: Kleene Closure**
  - Denoted as Σ* (Sigma star for alphabet Σ), represents all possible sequences you can make with your symbols, any length (including zero).
      - If Σ = {a, b}, Σ* = {"", "a", "b", "aa", "ab", "ba", "bb", ...}
  - **Properties:** Closed under concatenation and union; forms the basis for regular expressions.
  - **Analogy:** Like a vending machine that accepts any combination of coins (symbols) in any order and quantity.
  - **Extension:** Σ⁺ = Σ* without ε (one or more symbols). Used in pattern matching, e.g., email validation: [a-z]+@[a-z]+\.[a-z]+.
  
  This foundational closure operation enables recursive definitions, crucial for modeling repetitive structures in computing.`
    } as const,
  
    "68d3d95693b34da2cacd2431": {
      title: "Flat-2",
      summary: `## **Flat-2.pdf: DFA & NFA (with Analogies and Examples)**
  
  ### **Transition State Diagram (Traffic Analogy)**
  States are like intersections in a city. Arrows are roads, each marked with which color car (symbol) can travel it. The initial state has an entry ramp (starting arrow); final states are flag-marked as destinations.
  
  *Example (String must start with 'a'):*
  - **States:** S (start), A (after 'a' seen)
  - **Transitions:** From S, 'a' leads to A, 'b' leads to dead-end.
  - **Diagram Sketch:** S --a--> A (loop on A for a/b), S --b--> Dead.
  - **Acceptance:** Input "aab" goes S → A → A → A (accept); "baab" goes S → Dead (reject).
  
  Additional: Dead states (trap states) ensure completeness—every input leads somewhere, preventing undefined behavior.
  
  ### **Transition Table (Bus Route Table)**
  Think of bus stops (states). The table lists where the bus goes ("next stop") for each possible ticket (input) from each stop (state).
  
  | State | 'a' ticket | 'b' ticket | Notes |
  |-------|------------|------------|-------|
  | S     | A          | Dead       | Start: Strict entry condition |
  | A     | A          | B          | Once in A, stays or branches |
  | B     | A          | A          | Accepting state with loops |
  | Dead  | Dead       | Dead       | Sink: No escape |
  
  - You always know exactly what happens next in a DFA (bus operates on a timetable).
  - **Construction Tip:** Rows = states, columns = symbols. Fill all cells for determinism.
  
  ### **DFA—Deterministic Finite Automaton**
  - Only one way to go for each input at each state. Like a vending machine with no ambiguity: Press "A" at any time, you get the same snack.
  - **Formal Definition:** 5-tuple (Q, Σ, δ, q0, F). δ: Q × Σ → Q (single next state).
  - **Power:** Recognizes regular languages exactly. Efficient for implementation (O(n) time per string).
  
  **Example: Accepting strings that end with 'b':**
  - States: Start(S), NotEndB, EndB
      - On reading 'b', move to EndB; on reading 'a', remain or move to NotEndB.
      - Only strings finishing at EndB are accepted (e.g., "aab", "b", "babb").
  - **Transitions:** S --a/b--> NotEndB/EndB; NotEndB --a--> NotEndB, --b--> EndB.
  - **Real-World:** URL validators checking for .com endings.
  
  Additional: DFAs are minimal in states for efficiency; minimization algorithms reduce redundancy.
  
  ### **NFA—Non-Deterministic Finite Automaton**
  - Like a "choose your own adventure" book. For a given input, you might have more than one option at each point—or none!
  - The machine "accepts" if at least one choice leads to acceptance.
  - **Formal:** δ: Q × Σ → 2^Q (set of next states). Allows ε-transitions (free moves without input).
  - **Power:** Equivalent to DFA (can convert NFA → DFA via subset construction, though exponential blowup possible).
  
  *Example:* You are in state S and see symbol 'a'. Maybe you can go to states A, B, or even stay in S (multiple possible future paths). It's as if you are running several DFAs in parallel.
  - **NFA for (a|b)*abb:** States track prefixes " ", "a/b", "ab", "abb" with branches.
  - **Conversion Insight:** Subset construction creates a DFA state for every possible NFA state combination.
  
  Additional: NFAs are easier to design intuitively but DFAs are faster to simulate. Used in regex engines before compilation to DFA.`
    } as const,
  
    "68c8082247b63605991952d3": {
      title: "Flat-3",
      summary: `## **Flat-3.pdf: Moore and Mealy Machines (with Analogies and Examples)**
  
  ### **Moore Machine Analogies**
  - Like an elevator that announces the floor number only when it stops (state-based output).
  - The output is determined only by where you are (the current state).
  - **Formal:** Output function λ: Q → Δ (output alphabet). Outputs produced upon entering a state.
  - **Advantages:** Simpler design; outputs stable within states. **Disadvantages:** Possible delay in response.
  
  **Example:** Counting "a"s in a string.
  - States: 0 (zero 'a's), 1 (one 'a'), 2 (two 'a's)… Up each state for every 'a' read.
  - Output: Always show the counter as you enter each state.
  
  *For input "aba":*
  - Start at 0 → read 'a' → move to 1 (output 1)
  - Read 'b' → stay at 1 (output 1)
  - Read 'a' → move to 2 (output 2)
  - Output string: 0, 1, 1, 2
  - **Extension:** For modulo-3 count, cycle states 0→1→2→0, outputs 0/1/2.
  
  Additional: Moore machines model systems where status is queried periodically, like traffic lights (state = color, output = light on).
  
  ### **Mealy Machine Analogies**
  - Like a coin sorter that makes a sound instantly each time a coin (input) is detected.
  - Output depends on both the current state AND the current coin (input).
  - **Formal:** Output on transitions: δ: Q × Σ → Q × Δ. Immediate feedback.
  - **Advantages:** Faster response (no delay). **Disadvantages:** Outputs can glitch on state changes without input.
  
  **Example:** Count "ab" as a special pattern.
  - States: Start, SeenA
  - Inputs: 'a' or 'b'
  - Outputs a "ding" each time an "ab" is detected (on transition).
      - Read 'a' in Start → move to SeenA (no output)
      - Read 'b' in SeenA → output 1 (transition detected "ab")
      - Read other input: appropriate transitions with/without output.
  - **Input "abab":** Transitions: Start-a→SeenA (0), SeenA-b→Start (1), Start-a→SeenA (0), SeenA-b→Start (1). Output: 0,1,0,1.
  
  Additional: Mealy suits reactive systems, like keypads beeping on valid keypresses.
  
  **Comparison Table: Moore vs Mealy**
  
  | Criteria         | Moore Machine                     | Mealy Machine                                 | When to Use |
  |------------------|----------------------------------|-----------------------------------------------|-------------|
  | Output Basis     | Only current state                | State and input symbol                        | Moore: Stable outputs; Mealy: Immediate |
  | Elevator Analogy | Floor display (changes on arrival)| Chime that sounds as elevator moves (per move)| Moore: Display panels; Mealy: Alarms |
  | Output Timings   | On entering/being in state        | Instantly on input/transition                 | Moore: Batch processing; Mealy: Real-time |
  | State Count      | Often more states                 | Fewer states possible                          | Optimize based on hardware |
  
  Additional Insight: Both are finite state transducers (FSTs), converting input sequences to output sequences. Equivalent in expressive power but differ in timing. Used in digital circuit design and protocol modeling.`
    } as const,
  
    "68d3a6b781a1f08520a30d46": {
      title: "Flat-4",
      summary: `## **Flat-4.pdf: Conversion Between Moore and Mealy Machines**
  
  ### **Main Topics Covered**
  - Converting Moore machines to Mealy machines
  - Converting Mealy machines to Moore machines
  - Step-by-step procedures with examples
  - Transition table transformations
  - Equivalence proofs and optimizations
  
  ### **Key Concepts and Definitions**
  
  #### **Moore to Mealy Conversion**
  - **Core Idea:** Move the output from states to transitions (edges). This shifts from state-dependent to input-dependent outputs.
  - **Procedure:** Take the output associated with each state and attach it to all incoming transitions to that state.
  - **Result:** Same number of states, but outputs now depend on transitions (state + input) instead of just states.
  - **Why Convert?** Mealy can reduce state count in some cases or enable faster hardware implementation.
  
  #### **Mealy to Moore Conversion**
  - **Core Idea:** Create new states to represent different outputs that occur on transitions.
  - **Procedure:** If a state has multiple incoming transitions with different outputs, create separate states for each output combination. Merge states with identical outputs and transitions.
  - **Result:** May have more states than the original Mealy machine (because states are split based on output). Ensures outputs are purely state-based.
  - **Why Convert?** Moore simplifies testing and debugging, as outputs don't depend on inputs directly.
  
  ### **Bullet Points & Important Details**
  - **Moore → Mealy**: Number of states remains the same; outputs shift from states to transitions. Time complexity: O(|Q| * |Σ|).
  - **Mealy → Moore**: Number of states may increase (up to |Q| * |Δ| in worst case); each unique output pattern gets its own state.
  - Both machines are **equivalent in power**—they can represent the same input-output behavior. Conversions preserve language equivalence.
  - Conversion helps optimize based on application (Moore for simpler state-based logic, Mealy for faster response).
  - **Edge Cases:** Handle ε-transitions or dead states carefully; ensure completeness.
  
  ### **Analogy: Elevator System**
  
  | Machine Type | Analogy                                                    | Conversion Insight |
  |--------------|-----------------------------------------------------------|--------------------|
  | **Moore**    | Floor display shows number when elevator stops at a floor (output tied to state) | To Mealy: Display updates on door-open signal (transition) |
  | **Mealy**    | Elevator beeps immediately when button is pressed (output tied to action/transition) | To Moore: Create sub-states for each beep type |
  
  ### **Conversion Example Table: Moore to Mealy**
  
  **Original Moore Machine:**
  
  | State | Output | On 'a' | On 'b' |
  |-------|--------|--------|--------|
  | q0    | 0      | q1     | q0     |
  | q1    | 1      | q1     | q2     |
  | q2    | 0      | q0     | q2     |
  
  **Converted Mealy Machine:**
  - Attach q1's output (1) to transitions going TO q1
  - Attach q0's output (0) to transitions going TO q0
  - Attach q2's output (0) to transitions going TO q2
  
  | State | On 'a' (Next/Output) | On 'b' (Next/Output) |
  |-------|----------------------|----------------------|
  | q0    | q1/1                 | q0/0                 |
  | q1    | q1/1                 | q2/0                 |
  | q2    | q0/0                 | q2/0                 |
  
  **Verification:** For input "ab", Moore outputs 0 (q0) → 1 (enter q1) → 0 (enter q2). Mealy: q0-a→q1/1 (output 1 on transition) → q1-b→q2/0 (output 0). Matches delayed by one step in Moore.
  
  ### **Real-World Example**
  **Moore Machine:** Traffic light system where each state (Red, Yellow, Green) has a fixed light output. Timer triggers state changes.
  
  **Mealy Machine:** Smart traffic light that changes based on sensor input (car detected + current state = specific light output). E.g., Green + car→Yellow/Alert.
  
  Additional: Conversions are reversible; used in VLSI design for optimizing FSMs (Finite State Machines). Tools like Yosys automate this.`
    } as const,
  
    "68d3a6c481a1f08520a30d50": {
      title: "Flat-5",
      summary: `## **Flat-5.pdf: Minimization of Finite Automata**
  
  ### **Main Topics Covered**
  - What is DFA minimization?
  - Types of states: Productive vs Non-productive
  - Dead states, Unreachable states, Equal (Equivalent) states
  - Step-by-step minimization procedure
  - Examples with before/after diagrams
  - Myhill-Nerode theorem for uniqueness
  
  ### **What is Minimization? (Analogy)**
  Think of a company with 10 departments, but 3 of them do the exact same work. Minimization is like consolidating those duplicate departments to save resources while maintaining the same output. The "minimal DFA" is the most efficient version that accepts the same language.
  
  Minimization reduces the number of states without changing the recognized language. It's crucial for practical implementations, as fewer states mean less memory and faster processing. The minimal DFA is unique up to isomorphism.
  
  ### **Types of States**
  
  | State Type        | Definition                                               | Example/Analogy                          | Removal Impact |
  |-------------------|----------------------------------------------------------|------------------------------------------|----------------|
  | **Productive**    | Adds accepting power; affects language recognition       | Cashier who processes transactions       | Essential; keep |
  | **Dead State**    | Can never reach a final state; dead-end                  | Broken vending machine slot              | Retain for completeness, but minimize paths to it |
  | **Unreachable**   | Cannot be reached from initial state with any input      | Closed office on upper floor             | Safe to remove; no language change |
  | **Equal States**  | Behave identically for all inputs; redundant             | Two clerks doing identical jobs          | Merge; reduces redundancy |
  
  Additional: Productive states are reachable and lead to acceptance. Non-productive include traps and isolates.
  
  ### **Key Points in Bullets**
  - **Minimization** removes states that don't change the language the DFA accepts. Algorithm: Hopcroft's (O(|Q| log |Q|)) or Moore's.
  - **Dead states**: Created to make DFA complete (handle all inputs), but don't lead to acceptance. Often minimized away if unreachable.
  - **Unreachable states**: Never visited during any valid computation path. Detected via graph traversal (BFS/DFS from start).
  - **Equal/Equivalent states**: Two states are equal if, for any input string, they both lead to acceptance or both lead to rejection. Tested via distinguishability.
  - **Result**: Minimized DFA is **unique** for a given language—there's only one minimal form (per Myhill-Nerode theorem).
  
  ### **Minimization Procedure (Step-by-Step)**
  
  1. **Remove unreachable states**: Eliminate any state you can't get to from the start. Use reachability graph.
  2. **Group states**: Separate final states and non-final states into different groups (initial partition).
  3. **Partition groups**: Within each group, check if states behave the same for all inputs.
     - If two states transition to the same group on all inputs → they are **equivalent**.
     - If not → split them into separate groups. Iterate until stable (refinement).
  4. **Merge equivalent states**: Combine equal states into a single state; update transitions.
  5. **Redraw DFA**: Create new transition diagram with merged states. Verify equivalence.
  
  Additional: Partition refinement uses equivalence classes based on future behavior.
  
  ### **Example: Before and After Minimization**
  
  **Before (5 states):**
  \`\`\`
  States: q0 (start), q1, q2, q3 (final), q4 (dead)
  - q1 and q2 behave identically
  - q4 is unreachable
  Transitions: q0-a→q1, q0-b→q2; q1-a→q3, q1-b→q4; etc.
  \`\`\`
  
  **After Minimization (3 states):**
  \`\`\`
  States: q0 (start), q1 (merged q1 and q2), q3 (final)
  - Removed q4 (unreachable)
  - Merged q1 and q2 (equivalent)
  Transitions: q0-a/b→q1; q1-a→q3, q1-b→Dead (if needed)
  \`\`\`
  
  **Verification:** Simulate strings; both accept/reject identically.
  
  ### **Analogy: Cleaning Your Closet**
  - **Dead states** = Broken clothes (keep for completeness but never wear)
  - **Unreachable states** = Clothes stored in boxes you never open
  - **Equal states** = Multiple identical t-shirts (keep just one)
  - **Minimization** = Organized, decluttered closet with only useful items
  
  Additional: In software, tools like JFLAP visualize this. Minimization proves language regularity indirectly.`
    } as const,
  
    "68d3a6d581a1f08520a30d5a": {
      title: "Flat-6",
      summary: `## **Flat-6.pdf: Block Diagram of Finite Automata**
  
  ### **Main Topics Covered**
  - Physical/architectural view of how finite automata work
  - Components: Input tape, Reading head, Finite control
  - How DFA processes strings
  - Applications in compiler design
  - NFA extensions and multi-head variants
  
  ### **Components of Finite Automata**
  
  | Component          | Function                                                  | Analogy                                  | Technical Details |
  |--------------------|-----------------------------------------------------------|------------------------------------------|-------------------|
  | **Input Tape**     | Holds the input string in sequential squares             | Assembly line conveyor belt with items  | Semi-infinite; starts with left-end marker ⊢, ends with ⊣. Immutable after load. |
  | **Reading Head**   | Reads one symbol at a time, moves left to right          | Scanner reading barcodes one by one     | Unidirectional (right-only in standard DFA); position tracked implicitly by state. |
  | **Finite Control** | Brain/decision engine; manages state transitions         | Traffic controller directing cars        | Implements δ function; finite states Q ensure decidability. |
  | **End Markers**    | Mark beginning (⊢) and end (⊣) of input                  | Start/finish line markers in a race     | Not part of alphabet Σ; used for halting computation. |
  
  Additional: In NFAs, ε-moves allow head to "jump" without reading.
  
  ### **Key Points in Bullets**
  - **Input tape**: Divided into squares, each containing one symbol from the alphabet. Blanks (B) fill unused space.
  - **Reading head**: Examines one square at a time, moves only to the right (unidirectional). Halts at ⊣.
  - **Finite control**: The "brain" that uses the transition function to decide the next state. No loops or recursion due to finiteness.
  - **Deterministic**: For each input symbol at each state, there's exactly one next state (no ambiguity).
  - **Applications**: Lexical analysis in compilers, spell checkers, pattern matching. E.g., grep uses regex compiled to automata.
  
  ### **How It Works (Step-by-Step)**
  
  1. **Initialize**: Place reading head at the leftmost symbol (after start marker ⊢). State = q0, stack/tape empty if applicable.
  2. **Read symbol**: Head reads the current symbol on the tape.
  3. **Transition**: Finite control uses transition function δ(current_state, symbol) → next_state.
  4. **Move right**: Head shifts one square to the right.
  5. **Repeat**: Continue until the end marker (⊣) is reached.
  6. **Accept/Reject**: If final state is reached → Accept; otherwise → Reject. By final state or empty stack in PDAs.
  
  Additional: Computation time = O(n) for string length n.
  
  ### **Visual Representation (Conceptual)**
  
  \`\`\`
  Input String: "baa"
  Tape: [⊢][b][a][a][⊣]
         ↑
      Reading Head
  
  Finite Control (State Machine):
  - Current State: q0
  - Read 'b' → Transition to q1
  - Read 'a' → Transition to q2
  - Read 'a' → Transition to q3 (final)
  - Result: ACCEPT
  \`\`\`
  
  **State Table for Example:**
  | Step | Head Pos | Symbol | State | Action |
  |------|----------|--------|-------|--------|
  | 1    | 1        | b      | q0    | → q1  |
  | 2    | 2        | a      | q1    | → q2  |
  | 3    | 3        | a      | q2    | → q3  |
  | End  | 4        | ⊣      | q3    | Accept|
  
  ### **Analogy: Assembly Line Inspector**
  
  | Component       | Assembly Line Analogy                              | Extension |
  |-----------------|----------------------------------------------------|-----------|
  | Input Tape      | Conveyor belt with products                        | Quality logs as tape |
  | Reading Head    | Inspector examining one product at a time          | Single-pass inspection |
  | Finite Control  | Quality control rules (accept/reject criteria)     | Decision tree |
  | State Transition| Inspector's checklist (different checks per stage) | Escalation levels |
  | Acceptance      | Product passes all checks → approved               | Stamped "OK" |
  
  ### **Real-World Application: Compiler Lexical Analysis**
  When you write code like \`int x = 10;\`, the compiler uses a DFA to:
  - Recognize "int" as a keyword (state transitions for i → n → t)
  - Recognize "x" as an identifier (letter followed by alphanums)
  - Recognize "=" as an operator
  - Recognize "10" as a number literal (digits)
  
  Each token is validated by transitioning through states based on character input, just like the reading head on the tape! Additional: Flex/Bison tools generate such scanners from regex.
  
  **Extensions:** Multi-head automata for parallel processing; theoretical but inspires multi-core designs.`
    } as const,
  
    "68d3a6f381a1f08520a30d6e": {
      title: "Flat-7",
      summary: `## **Flat-7-R.E.pdf: Regular Expressions (Regex)**
  
  ### **Main Topics Covered**
  - What are Regular Expressions (R.E)?
  - Primitive Regular Expressions and Operations
  - Operator Precedence
  - Identities and Algebraic Properties
  - Converting DFA ↔ Regular Expressions
  - Arden's Theorem
  - Pumping Lemma for regularity proofs
  
  ### **What is a Regular Expression? (Analogy)**
  Think of a regular expression as a **search pattern recipe**. Just like a cooking recipe tells you what ingredients to combine and in what order, a regex tells you what symbols can appear in strings and in what patterns.
  
  Regex describe regular languages concisely. They're foundational for text processing and are compiled into NFAs for efficient matching.
  
  ### **Basic Building Blocks**
  
  | Symbol/Operation | Meaning | Example | Language Generated | Properties |
  |------------------|---------|---------|-------------------|------------|
  | **a** (symbol) | Single character | \`a\` | {a} | Atomic; matches exactly once |
  | **ε (epsilon)** | Empty string | \`ε\` | {""} | Identity for concatenation |
  | **∅ (phi)** | Empty set | \`∅\` | { } (no strings) | Identity for union; absorbs in concat |
  | **a + b** (Union) | Either a OR b | \`a+b\` | {a, b} | Disjunctive; | in practical regex |
  | **ab** (Concatenation) | a followed by b | \`ab\` | {ab} | Sequential; implicit in writing |
  | **a*** (Kleene Star) | Zero or more a's | \`a*\` | {ε, a, aa, aaa, ...} | Repetition; greedy by default |
  | **a+** (Positive Closure) | One or more a's | \`a+\` | {a, aa, aaa, ...} | Non-empty star; a* a |
  
  Additional: Practical extensions: ? (zero or one), {n,m} (repeats), ^/$ (anchors).
  
  ### **Operator Precedence (Top to Bottom)**
  1. **Brackets** ( ) — Group subexpressions
  2. **Kleene Star** * / **Positive Closure** + — Repetition
  3. **Concatenation** (placing symbols together) — Sequencing
  4. **Union** + — Choice
  
  *Analogy:* Like math (PEMDAS/BODMAS), regex has an order: parentheses first, then repetition, then sequencing, finally choice. Use parens to override, e.g., (ab)* vs a(b*).
  
  ### **Key Points in Bullets**
  - **Regular Language**: Any language that can be described by a regular expression. Closed under union, concat, star.
  - **Equivalence**: Two different regex can generate the same language (e.g., \`(a+b)*\` = \`(a*b*)*\`). Normalize via state elimination.
  - **One regex → One language**, but **many regex → same language**. Ambiguity resolved by NFA conversion.
  - Regular expressions are used in text editors, search tools, compilers for pattern matching. E.g., Unix grep: egrep 'a(b|a)*' file.txt.
  
  ### **Example Problems with Solutions**
  
  | Problem | Regular Expression | Explanation | Test Strings |
  |---------|-------------------|-------------|--------------|
  | Ends with "bab" | \`(a+b)*bab\` | Any string, then "bab" at end | "aabab" (yes), "baba" (no) |
  | Contains "aba" | \`(a+b)*aba(a+b)*\` | "aba" anywhere in string | "xaba y" (yes), "ab" (no) |
  | Starts and ends with 'a' | \`a(a+b)*a + a\` | 'a', middle anything, 'a' (or single 'a') | "aba" (yes), "abb" (no) |
  | Starts and ends same | \`a(a+b)*a + b(a+b)*b + a + b\` | Mirror start/end with 'a' or 'b' | "aaa" (yes), "aba" (no) |
  | Equal a's and b's pattern | \`(a^n)(b^n)\` | n a's followed by n b's | "aabb" (yes); not regex! (needs PDA) |
  
  Additional: For non-regular like {a^n b^n}, regex fails Pumping Lemma.
  
  ### **Arden's Theorem (Converting DFA to Regex)**
  **Formula:** If \`R = Q + RP\` and P doesn't contain ε, then \`R = QP*\`
  
  *Analogy:* Like solving algebraic equations, Arden's theorem solves for a state's regex by isolating it. Treat states as variables, transitions as coefficients.
  
  **Example Steps:**
  1. Write equations for each state showing incoming transitions: e.g., R0 = ε + a R1 + b R2
  2. Substitute equations into each other (eliminate variables)
  3. Apply Arden's theorem to solve for final state regex
  4. Result: Regex for language accepted from start to finals.
  
  Additional: State elimination alternative: Remove states one-by-one, updating edge labels with regex.
  
  ### **Algebraic Properties**
  
  | Property | Formula | Example | Proof Sketch |
  |----------|---------|---------|--------------|
  | Associative | \`(r+s)+t = r+(s+t)\` | Grouping doesn't matter | By set union commutativity |
  | Commutative (Union) | \`r+s = s+r\` | Order in union doesn't matter | Set symmetry |
  | Distributive | \`r(s+t) = rs+rt\` | Like multiplication in algebra | Distributive law over concat |
  | Identity | \`r+∅ = r\`, \`rε = r\` | Empty set/string identities | Absorbs neutrals |
  | Idempotent | \`r+r = r\` | Repeating union = same | Set idempotence |
  
  Additional: These form a Kleene algebra, enabling optimizations like simplifying (a+a)* to a*. Pumping Lemma: For regular L, long strings pump without leaving L.`
    } as const,
  
    "68d3a70281a1f08520a30d7e": {
      title: "Flat-8",
      summary: `## **Flat-8.pdf: Formal Grammars**
  
  ### **Main Topics Covered**
  - Formal Grammar Definition (4-tuple)
  - Chomsky Hierarchy (Types 0, 1, 2, 3)
  - Regular Grammar (Left-linear and Right-linear)
  - Converting Grammar ↔ Finite Automata
  - Production Rules and Derivations
  - Sentential forms and language generation
  
  ### **What is Grammar? (Analogy)**
  Grammar is like a **sentence construction kit**. Instead of a machine that *recognizes* valid sentences (like DFA), grammar *generates* valid sentences from rules. Grammars are generative models, dual to automata recognizers.
  
  ### **Formal Grammar Structure**
  **4-tuple: G = (VN, Σ, P, S)**
  
  | Component | Meaning | Analogy | Constraints |
  |-----------|---------|---------|-------------|
  | **VN** | Non-terminals (Variables) | Placeholders/categories (like "Noun", "Verb") | Uppercase; generate strings |
  | **Σ** | Terminals (Alphabet) | Actual words/symbols | Lowercase; final output |
  | **P** | Production Rules | Grammar rules for replacement | α → β, α contains non-terminal |
  | **S** | Start Symbol | Where you begin generating | S ∈ VN; unique |
  
  Additional: Rules must have left-hand side (LHS) with at least one non-terminal.
  
  ### **Chomsky Hierarchy (Type 0-3)**
  
  | Type | Name | Production Form | Machine | Example | Power Notes |
  |------|------|----------------|---------|---------|-------------|
  | **Type 0** | Unrestricted | α → β (any) | Turing Machine | Any computable language | Full RE power; undecidable properties |
  | **Type 1** | Context-Sensitive | αAβ → αγβ (|γ| ≥ 1) | Linear Bounded Automaton | {a^n b^n c^n} | Length non-decreasing; context matters |
  | **Type 2** | Context-Free (CFG) | A → γ | Pushdown Automaton | {a^n b^n} balanced parens | Single non-terminal LHS; most programming langs |
  | **Type 3** | Regular | A → aB or A → a | Finite Automaton | {a^n} simple patterns | Linear; no memory |
  
  *Hierarchy:* Type 3 ⊂ Type 2 ⊂ Type 1 ⊂ Type 0 (each is more powerful). Inclusion strict: e.g., {a^n b^n} not regular.
  
  Additional: Type 3 includes left/right-linear grammars.
  
  ### **Regular Grammar Types**
  
  | Type | Production Form | Example | Equivalence |
  |------|----------------|---------|-------------|
  | **Right-linear** | A → aB, A → a | S → aA, A → b | Directly to NFA (states = non-terminals) |
  | **Left-linear** | A → Ba, A → a | S → Ab, A → a | Mirror of right-linear; reverse for conversion |
  
  *Note:* Can't mix left and right linear in same grammar! Both generate regular languages.
  
  ### **Key Points in Bullets**
  - **Derivation**: Process of generating strings from start symbol using production rules. Forward only (no reverse).
  - **Sentential Form**: Any intermediate string during derivation (can have terminals + non-terminals). E.g., S → AB → aB → ab.
  - **Language of Grammar L(G)**: Set of all strings derivable from S that contain only terminals. L(G) = {w ∈ Σ* | S ⇒* w}.
  - **Reverse substitution NOT allowed**: If S→AB, you can't go backward AB→S. Derivations are one-way.
  - Grammar is a **generator**, Automata is a **recognizer**. Dual views: Chomsky-Schützenberger theorem links them.
  
  ### **Example: Grammar to Language**
  
  **Grammar:**
  \`\`\`
  S → aSb | ε
  \`\`\`
  
  **Derivation:**
  - S → ε (gives "")
  - S → aSb → ab (n=1)
  - S → aSb → aaSbb → aabb (n=2)
  - S → aSb → aaSbb → aaaSbbb → aaabbb (n=3)
  
  **Language:** L = {aⁿbⁿ | n ≥ 0} = {"", "ab", "aabb", "aaabbb", ...}
  
  Additional: This is context-free, not regular (Pumping Lemma violation).
  
  ### **Converting Grammar ↔ Finite Automata**
  
  **Grammar → FA:**
  - Each non-terminal becomes a state
  - Production A → aB creates transition: A --a--> B
  - Production A → a creates transition: A --a--> (Final State)
  - S = start; non-terminals with ε-productions = finals
  
  **FA → Grammar:**
  - Each state becomes a non-terminal
  - Transition q0 --a--> q1 becomes production: Q0 → aQ1
  - Final state q becomes: Q → ε
  - Right-linear grammar results
  
  Additional: Conversion proves regular grammar ≡ FA. For left-linear, reverse the FA.`
    } as const,
  
    "68d3a71a81a1f08520a30d97": {
      title: "Flat-9",
      summary: `## **Flat-9.pdf: Context-Free Grammar (CFG)**
  
  ### **Main Topics Covered**
  - Context-Free Grammar definition
  - Derivation Trees (Parse Trees)
  - Left-most and Right-most Derivations
  - Ambiguous vs Unambiguous Grammars
  - CFG Simplification/Minimization
  - Chomsky Normal Form (CNF)
  - Pumping Lemma for CFLs
  
  ### **What is CFG? (Analogy)**
  CFG is like a **programming language syntax**. It defines how to construct valid expressions, statements, and programs. Compilers use CFG to parse your code! CFGs handle nested structures (e.g., balanced parentheses) that regular grammars can't.
  
  ### **Key Concepts**
  
  | Concept | Definition | Example | Visualization |
  |---------|-----------|---------|---------------|
  | **CFG** | Grammar where LHS is always single non-terminal | A → γ | S → (S) \| ε for parens |
  | **Derivation** | Process of expanding non-terminals into strings | E → E+E → id+E → id+id | Step-by-step replacement |
  | **Parse Tree** | Graphical representation of derivation | Tree showing how string is derived | Root=S, leaves=terminals |
  | **Sentential Form** | Any intermediate step in derivation | E+E, id+E (mixed terminals/non-terminals) | αAβ ⇒ αγβ |
  
  Additional: Yield of parse tree = terminal string.
  
  ### **Derivation Types**
  
  | Type | Strategy | Abbreviation | Use Case | Example for E → E+E \| id; "id+id" |
  |------|----------|--------------|----------|------------------------------------|
  | **Left-most Derivation** | Always expand leftmost non-terminal first | LMD | Bottom-up parsing | E ⇒ E+E ⇒ id+E ⇒ id+id |
  | **Right-most Derivation** | Always expand rightmost non-terminal first | RMD | Top-down parsing | E ⇒ E+E ⇒ E+id ⇒ id+id |
  
  *Analogy:* Like reading a book left-to-right (LMD) vs right-to-left (RMD) - you get to the same ending but take different paths. Both prove membership if they derive the string.
  
  Additional: All derivations can be converted between LMD/RMD.
  
  ### **Ambiguous vs Unambiguous Grammar**
  
  | Type | Definition | Example | Issue | Fix |
  |------|-----------|---------|-------|-----|
  | **Ambiguous** | More than one parse tree for same string | E → E+E \| E*E \| id (for "id+id*id") | Multiple meanings (e.g., + before *?) | Rewrite: E → E+T \| T; T → T*F \| F |
  | **Unambiguous** | Exactly one parse tree per string | E → E+T \| T, T → T*F \| F, F → id | Unique interpretation | Precedence via levels |
  
  **Why it matters:** Ambiguous grammars cause problems in compilers (which operation first: + or *?). Inherent ambiguity undecidable, but practical fixes exist.
  
  Additional: Dangling else problem in if-then-else is classic ambiguity.
  
  ### **CFG Simplification Steps**
  
  1. **Remove Null Productions** (A → ε): Add alternatives without A; mark nullable vars.
  2. **Remove Unit Productions** (A → B): Replace A → γ where B ⇒* γ.
  3. **Remove Useless Symbols** (variables that don't derive terminals): Two passes—unreachable from S, non-generating.
  
  Additional: Preserves L(G); essential for normal forms.
  
  ### **Chomsky Normal Form (CNF)**
  
  **Rules:** Every production must be in one of these forms:
  - A → BC (two non-terminals)
  - A → a (single terminal)
  
  **Why CNF?** Standardized form makes parsing algorithms efficient (like CYK parser, O(n^3)). Every CFL has a CNF equivalent.
  
  Additional: No ε except possibly S → ε; no unit productions.
  
  ### **Example: Converting to CNF**
  
  **Original:**
  \`\`\`
  S → aBbA
  A → aB
  B → b
  \`\`\`
  
  **Step 1:** Convert terminals in productions with multiple symbols
  \`\`\`
  S → C₁BC₂A where C₁→a, C₂→b
  A → C₁B
  B → b
  \`\`\`
  
  **Step 2:** Break productions with >2 non-terminals
  \`\`\`
  S → C₁D where D→BC₂A
  D → BE where E→C₂A
  E → C₂A
  A → C₁B
  B → b
  C₁ → a
  C₂ → b
  \`\`\`
  
  *Final result: All productions in CNF!*
  
  Additional: Pumping Lemma for CFLs: uvxyz, |vy|≥1, |vxy|≤p, pumps u v^i x y^i z in L. Proves non-CFLs like {a^n b^n c^n}.`
    } as const,
  
    "68d3a73081a1f08520a30da5": {
      title: "Flat-10",
      summary: `## **Flat-10.pdf: Advanced FA Topics**
  
  ### **Main Topics Covered**
  - Two-Way Finite Automata (2FA)
  - Practice problems for DFA design
  - Regular expression examples
  - Even/odd pattern acceptance
  - Pumping Lemma applications
  
  ### **Two-Way Finite Automata (2FA)**
  
  **Key Difference from DFA:**
  - **DFA**: Tape head moves only RIGHT →
  - **2FA**: Tape head can move LEFT ← or RIGHT →
  
  **Transition Function:** δ(Q × Σ) → Q × {L, R}
  - Not just "next state" but also "direction to move". Halts on special state or loop detection.
  
  **Power:** 2FA recognize exactly regular languages (can simulate with DFA via crossing sequences). But more intuitive for some designs.
  
  ### **Analogy: Reading a Book**
  - **DFA**: You can only turn pages forward (one-way reader)
  - **2FA**: You can flip back to re-read sections (can move both ways)
  - **Limitation:** Still finite states; can't remember arbitrary history without tape marks (which would make it TM-like).
  
  Additional: 2FA useful for theoretical proofs; practical regex engines use one-way for efficiency.
  
  ### **Example Practice Problems**
  
  | Problem | Solution Approach | Regular Expression | DFA States Insight |
  |---------|------------------|-------------------|--------------------|
  | Even 0s and even 1s | 4 states tracking parity | \`(00+11+(01+10)(01+10)*01+10))*\` | Product automaton: parity0 × parity1 |
  | Even 0s followed by single 1 | Chain: even-0 states → transition on 1 → final | \`(00)*1\` | 2 states for even0, then sink on extra 1 |
  | Even length strings | 2 states (even/odd position) | \`((a+b)(a+b))*\` | Toggle on each symbol |
  | Odd number of 1s | 2 states (odd/even 1-count) | \`0*10*(10*10*)*\` | Ignore 0s, flip on 1s |
  
  Additional: For AND conditions, use Cartesian product (states multiply). E.g., even0 AND odd1: 2×2=4 states.
  
  ### **Key Points in Bullets**
  - **2FA** is more powerful for recognition but equivalent to DFA in accepting power (can convert 2FA → DFA via state encoding of head position, though exponential).
  - **Parity problems** (even/odd counts) require state tracking. Generalizes to modulo-k with k states.
  - Combining multiple conditions (e.g., even 0s AND odd 1s) requires Cartesian product of states. Minimizable post-construction.
  - Regular expressions and DFAs are **equivalent** - can always convert between them (Kleene's theorem).
  - **Pumping Lemma:** For |w|≥p, split w=xyz, |xy|≤p, |y|≥1; x y^i z in L ∀i≥0. Use to prove non-regularity, e.g., {a^n b^n}.
  
  Additional: Practice Tip: Draw diagrams first, then tables. Tools like JFLAP simulate. Real-world: Network protocols use FAs for packet validation.`
    } as const,
    
    // Flat-11
    "6926f03058b12d3aac59b6ba": {
      title: "Flat-11",
      summary: `## **Flat-11.pdf: Advanced CFG Topics & Normal Forms**
  
  ### **Main Topics Covered**
  - Converting Regular Grammar to Regular Expression
  - Converting Regular Grammar to Finite Automata
  - Converting Finite Automata to Grammar
  - Context-Free Grammar (CFG) Basics Review
  - Derivations (LMD, RMD)
  - Ambiguous vs Unambiguous Grammars
  - CFG Simplification (removing null, unit, useless productions)
  - Chomsky Normal Form (CNF)
  - Greibach Normal Form (GNF)
  - Kuroda Normal Form (KNF)
  - Pumping Lemma extensions
  
  ### **Grammar ↔ Automata Conversions**
  
  #### **Regular Grammar → Regular Expression**
  Using **substitution and algebraic manipulation** to eliminate states. Arden's theorem accelerates solving systems.
  
  **Example:**
  \`\`\`
  S → 01S | 01
  \`\`\`
  - S = 01S + 01
  - Apply Arden's: S = 01(01)* = (01)⁺
  - **Language:** One or more "01" pairs.
  
  Additional: Handles loops; substitute recursively.
  
  #### **Regular Grammar → Finite Automata**
  - Each non-terminal = state
  - Production A → aB creates: A --a--> B
  - Production A → a creates: A --a--> Final State
  - Finals: Non-terminals with ε-productions
  
  **Example:** Above grammar → States S (start/final), loop on "01".
  
  #### **Finite Automata → Grammar**
  Reverse process:
  - Transition q₀ --a--> q₁ becomes: Q₀ → aQ₁
  - Final state q becomes: Q → ε
  - Results in right-linear grammar.
  
  Additional: Left-linear from reversed FA. Proves equivalence.
  
  ### **CFG Simplification Steps**
  
  | Step | What to Remove | Why | Algorithm |
  |------|---------------|-----|-----------|
  | **1. Null Productions** | A → ε | Creates ambiguity, complicates parsing | Nullable set closure; add alternatives |
  | **2. Unit Productions** | A → B | Redundant, adds unnecessary steps | Compute A ⇒* B chains; replace |
  | **3. Useless Symbols** | Variables that don't contribute to derivations | Dead code, wastes resources | Reachability (from S) + generativity (to terminals) |
  
  Additional: Order matters; null first.
  
  ### **Example: Removing Null Productions**
  
  **Before:**
  \`\`\`
  S → AbB
  A → a | ε
  B → b | ε
  \`\`\`
  
  **After (generate equivalent strings without ε):**
  \`\`\`
  S → AbB | Ab | aB | a
  A → a
  B → b
  \`\`\`
  
  *Trick:* For each nullable variable, create versions with/without it. E.g., for S → A x B, add A x B, x B (A null), A x (B null), x (both null).
  
  ### **Normal Forms Comparison**
  
  | Normal Form | Production Format | Key Benefit | Usage | Derivation Length |
  |-------------|------------------|-------------|-------|-------------------|
  | **CNF** | A → BC or A → a | Parsing in O(n³) time | CYK parser, theoretical analysis | 2n-1 steps for length n |
  | **GNF** | A → aα (terminal first) | Parsing in O(n) steps | Top-down parsers, simplifies analysis | n steps |
  | **KNF** | Context-sensitive rules like AB → CD | For Type-1 grammars | Linear bounded automata | Handles context |
  
  Additional: All CFGs convertible to these; KNF for CSLs.
  
  ### **Chomsky Normal Form (CNF) Details**
  
  **Rules:**
  - A → BC (two non-terminals)
  - A → a (single terminal)
  
  **Properties:**
  - For string length n, derivation uses **exactly 2n-1 productions**
  - Number of sentential forms = 2n-1
  - No terminals in mixed productions (replace with new vars)
  
  **Analogy:** CNF is like binary trees - every node has exactly 2 children (non-terminals) or is a leaf (terminal). Enables dynamic programming in parsers.
  
  ### **Greibach Normal Form (GNF) Details**
  
  **Rules:**
  - A → aα where a is terminal, α is string of non-terminals (possibly empty)
  
  **Properties:**
  - For string length n, derivation uses **exactly n productions**
  - Number of sentential forms = n
  - **More efficient than CNF!** No left-recursion issues.
  
  **Analogy:** GNF is like an assembly line - each step produces exactly one output item (terminal), then passes work to next stations (non-terminals). Ideal for recursive descent parsers.
  
  Additional: Conversion from CNF: Order vars, eliminate left-recursion via substitution. Pumping for CFLs: uvxyz with conditions; proves {ww^R} CFL but {a^n b^n c^n} not.`
    } as const,
  
    // Flat-12
    "6926f04558b12d3aac59b6c1": {
      title: "Flat-12",
      summary: `## **Flat-12.pdf: Pushdown Automata (PDA)**
  
  ### **Main Topics Covered**
  - What is a Pushdown Automaton?
  - Components of PDA
  - Formal Definition (7-tuple)
  - Stack Operations (Push, Pop, Skip)
  - Deterministic PDA (DPDA) vs Non-Deterministic PDA (NPDA)
  - Instantaneous Descriptions (ID)
  - Design Examples
  - Decision Properties of CFLs
  - Closure Properties
  - Two-Stack PDA
  - Pumping Lemma for CFLs
  
  ### **What is PDA? (Analogy)**
  A PDA is like a **DFA with a notepad (stack)**. While processing input, it can write notes (push), read notes (pop), or ignore notes (skip). This extra memory lets it recognize context-free languages like balanced parentheses or {a^n b^n}.
  
  PDAs model parsers for programming languages, handling recursion and nesting.
  
  ### **Components of PDA**
  
  | Component | Function | Analogy | Details |
  |-----------|----------|---------|---------|
  | **Input Tape** | Holds the input string | Assembly line with items | Read-only; head moves right |
  | **Finite Control** | State machine logic | Quality inspector's checklist | Q states; transitions on input/stack |
  | **Stack** | Infinite memory (LIFO) | Stack of plates | Top-access; Γ symbols; bottom Z0 |
  
  Additional: Stack enables unbounded but structured memory.
  
  ### **Formal Definition: 7-Tuple**
  **PDA = (Q, Σ, Γ, δ, q₀, Z₀, F)**
  
  | Symbol | Meaning | Example |
  |--------|---------|---------|
  | Q | Finite set of states | {q0, q1, q_accept} |
  | Σ | Input alphabet | {a, b} |
  | Γ | Stack alphabet (symbols that can be on stack) | {a, Z0} |
  | δ | Transition function: Q × (Σ ∪ {ε}) × Γ → 2^(Q × Γ*) | δ(q0, a, Z0) = {(q0, aZ0)} (push) |
  | q₀ | Initial state | q_start |
  | Z₀ | Initial stack symbol (bottom marker) | $ or Z |
  | F | Set of final states | {q_f} or accept by empty stack |
  
  Additional: ε-input allows free moves; Γ* allows pop/push strings (but usually single symbols).
  
  ### **Stack Operations**
  
  | Operation | Notation | Before | After | Meaning | Example Transition |
  |-----------|----------|--------|-------|---------|--------------------|
  | **PUSH** | a, Z₀/aZ₀ | Z₀ | aZ₀ | Add 'a' on top of Z₀ | δ(q, a, Z0) → (q, aZ0) |
  | **POP** | a, Z/ε | Z | (empty) | Remove Z from stack | δ(q, a, Z) → (q, ε) match |
  | **SKIP** | a, Z/Z | Z | Z | No stack change | δ(q, a, Z) → (q, Z) ignore |
  
  **Important:** Only **one symbol** can be pushed at a time! Multi-symbol via new states.
  
  Additional: Pop matches input to stack top.
  
  ### **DPDA vs NPDA**
  
  | Feature | DPDA | NPDA | Notes |
  |---------|------|------|-------|
  | Transitions | At most one per (state, input, stack) | Can have multiple | DPDA: Predictable path |
  | Acceptance Power | **Subset** of CFLs | **All** CFLs | DCFLs proper subset |
  | Equivalence | NOT equivalent to NPDA | More powerful | {ww^R} needs nondet |
  | Examples | L = {aⁿbⁿ} (deterministic) | L = {wwᴿ} (palindromes, guess center) | LR parsers use DPDA |
  
  *Key Insight:* Unlike DFA ≡ NFA, **DPDA ≠ NPDA**. Non-determinism adds power for CFLs! Many CFLs inherently nondet.
  
  ### **Example: PDA for aⁿbⁿ (n ≥ 1)**
  
  **Strategy:**
  1. Push 'a' for each input 'a'
  2. Pop 'a' for each input 'b'
  3. Accept if stack is empty at end (or final state)
  
  **Transitions:**
  \`\`\`
  q₀ --a,Z₀/aZ₀--> q₀  (Push first 'a')
  q₀ --a,a/aa--> q₀     (Push more 'a's)
  q₀ --b,a/ε--> q₁      (Start matching 'b's, pop)
  q₁ --b,a/ε--> q₁      (Continue matching)
  q₁ --ε,Z₀/ε--> q₂     (Accept when stack empty, ε-input)
  \`\`\`
  
  Additional: For n=0, add q0 --ε,Z0/ε--> q2.
  
  ### **Instantaneous Description (ID)**
  
  **Format:** (state, remaining_input, stack_contents)
  
  **Example for input "aabb":**
  \`\`\`
  (q₀, aabb, Z₀) ⊢ (q₀, abb, aZ₀) ⊢ (q₀, bb, aaZ₀) 
  ⊢ (q₁, b, aZ₀) ⊢ (q₁, ε, Z₀) ⊢ (q₂, ε, ε) ACCEPT
  \`\`\`
  
  *Analogy:* Like a video game save state - captures exact moment of computation. ⊢ denotes single step.
  
  Additional: Acceptance by final state or empty stack (equivalent for CFLs).
  
  ### **Decision Properties of CFLs**
  
  | Property | Decidable? | Method | Notes |
  |----------|-----------|--------|-------|
  | **Emptiness** | ✅ Yes | Check if start symbol derives any terminal | Fixed-point computation |
  | **Finiteness** | ✅ Yes | Check for loops/cycles in derivation graph | Pumping detects infinity |
  | **Membership** | ✅ Yes | Parse the string (CYK algorithm) | O(n^3) for CNF |
  | **Equality** | ❌ No | Undecidable for CFLs | Reduction from PCP |
  | **Ambiguity** | ❌ No | Undecidable for CFLs | Inherent ambiguity hard |
  
  Additional: All CFLs decidable for basic props, unlike Type-0.
  
  ### **Closure Properties**
  
  **CFLs ARE closed under:**
  - Union ✅ (new S → S1 \| S2)
  - Concatenation ✅ (S → S1 S2)
  - Kleene Star ✅ (S → S S \| ε)
  - Substitution ✅ (homomorphisms)
  - Inverse homomorphism ✅
  
  **CFLs are NOT closed under:**
  - Intersection ❌ (but CFL ∩ Regular = CFL)
  - Complement ❌
  
  **Important Exception:** CFL ∩ Regular = CFL (intersection with regular language IS closed!). Use PDA + DFA product.
  
  Additional: Union via disjoint copies.
  
  ### **Two-Stack PDA**
  
  A PDA with **two independent stacks** is as powerful as a **Turing Machine**! Can recognize Type-0 languages.
  
  **Example:** L = {aⁿbⁿcⁿ}
  - Stack 1: Track 'a's vs 'b's (push a, pop on b)
  - Stack 2: Track 'b's vs 'c's (push b on first pass, pop on c)
  
  Additional: Simulates tape by using stacks for left/right. Pumping: uvxyz in L, pump preserves.`
    } as const,
  
    // Flat-13
    "6926f05f58b12d3aac59b6c8": {
      title: "Flat-13",
      summary: `## **Flat-13.pdf: Turing Machines**
  
  ### **Main Topics Covered**
  - What is a Turing Machine (TM)?
  - Components of TM
  - Formal Definition (7-tuple)
  - Designing TMs for specific languages
  - Instantaneous Descriptions
  - Variants of Turing Machines
  - Language Acceptability
  - Universal TM and halting problem
  
  ### **What is a Turing Machine? (Analogy)**
  A Turing Machine is like a **super-powered computer** with unlimited memory (infinite tape) and complete control (can read, write, move both ways). It's the **most powerful** computational model—anything computable can be done by a TM.
  
  TMs define recursive enumerable (RE) languages; Church-Turing thesis says they're equivalent to any algorithm.
  
  ### **Why Turing Machines Matter**
  
  | Use Case | Description | Impact |
  |----------|-------------|--------|
  | **Universal Model** | Accepts Type-0 (unrestricted) languages | Basis for computability theory |
  | **Decidability** | Determines which problems are solvable | Halting problem undecidable |
  | **Complexity** | Measures time and space requirements | P vs NP via TM simulations |
  | **Theoretical Limit** | Defines what is computable | No "super-TM" beyond it |
  
  Additional: TMs inspire RAM models in algorithms.
  
  ### **Components of Turing Machine**
  
  | Component | Description | Key Feature | Analogy |
  |-----------|-------------|-------------|---------|
  | **Infinite Tape** | Unlimited memory cells | Can move LEFT or RIGHT | Endless scroll of paper |
  | **Read/Write Head** | Reads, writes, moves | Both input and output | Pencil eraser on paper |
  | **Finite Control** | State machine | Decision logic | Programmer's brain |
  | **Blank Symbol (B)** | Empty cell marker | Extends tape infinitely | White space |
  
  **Key Difference from PDA:** TM can **write** to tape, move **both directions**, and tape is **infinite** (not just stack). Enables arbitrary computation.
  
  Additional: Tape divided into cells; head always on one.
  
  ### **Formal Definition: 7-Tuple**
  **TM = (Q, Σ, Γ, δ, q₀, B, F)**
  
  | Symbol | Meaning | Example |
  |--------|---------|---------|
  | Q | Finite set of states | {q0, q_loop, q_halt} |
  | Σ | Input alphabet | {0,1} |
  | Γ | Tape alphabet (Σ ⊂ Γ, includes B) | {0,1,B,X} (marks) |
  | δ | Transition function: Q × Γ → Q × Γ × {L, R} | δ(q0,0) = (q1, X, R) mark & move |
  | q₀ | Initial state | Start |
  | B | Blank symbol (B ∈ Γ, B ∉ Σ) | _ |
  | F | Set of final states | {q_accept, q_reject} |
  
  Additional: δ partial; undefined = reject. Halt on q in F or no δ.
  
  ### **Example: TM for L = {aⁿbⁿ | n ≥ 1}**
  
  **Strategy:**
  1. Mark first 'a' with X, find first 'b', mark with Y
  2. Return to start (move left)
  3. Repeat until all matched (no unmarked a/b)
  4. Accept if all become X and Y, reject otherwise
  
  **Visual:**
  \`\`\`
  Input: aaabbb
  Step 1: XaabbbY  (marked first pair)
  Step 2: XXabbYY   (second)
  Step 3: XXXbYYY   (third)
  Step 4: XXXYYYY → Scan for unmarked → q_accept
  \`\`\`
  
  Additional: Uses states for phases: mark_a, find_b, return, check.
  
  ### **Instantaneous Description (ID)**
  
  **Format:** α q β
  - α = tape contents to left of head
  - q = current state
  - β = symbol under head + tape to right
  
  **Example:**
  \`\`\`
  Initial: q₀aaabbb
  After 1: Xq₁aabbb   (marked a, moved right)
  After 2: Xaq₁abbb   (finding b)
  ...
  Final: XXXYYYq_accept
  \`\`\`
  
  Additional: Multi-step ⇒*; single ⊢. Church-Rosser: Confluent if deterministic.
  
  ### **Variants of Turing Machines**
  
  | Variant | Description | Power vs Standard TM | Simulation Cost |
  |---------|-------------|----------------------|-----------------|
  | **Multi-tape TM** | Multiple tapes with independent heads | Equivalent (can simulate) | O(n^2) time |
  | **Multi-dimensional TM** | 2D or 3D tape | Equivalent | Linear overhead |
  | **Non-deterministic TM** | Multiple possible transitions | Equivalent (but faster) | NPSPACE=PSPACE |
  | **Two-way Infinite Tape** | Infinite in both directions | Equivalent | No difference |
  | **Semi-infinite Tape** | Infinite only to right | Equivalent | Head position encoding |
  | **Stay Option TM** | Can stay in place (not move L/R) | Equivalent | Add stay to {L,R} |
  
  **Key Insight:** All variants are **computationally equivalent** - they can all simulate each other! Proves robustness of TM model.
  
  Additional: Universal TM (U): Simulates any TM M on input w using code <M,w>. Halting problem: Undecidable if M halts on w. Rice's theorem: Non-trivial RE properties undecidable.`
    } as const,
  
    // Greibach Normal Form
    "6926f09c58b12d3aac59b6cf": {
      title: "Greibach Normal Form",
      summary: `## **Greibach-normal-form.pdf: GNF Conversion Algorithm**
  
  ### **Main Topics Covered**
  - Step-by-step GNF conversion procedure
  - Handling left recursion
  - Substitution techniques
  - Worked examples
  - Proof of equivalence and complexity
  
  ### **GNF Conversion Steps**
  
  | Step | Action | Purpose | Details |
  |------|--------|---------|---------|
  | **1** | Ensure grammar is in CNF | Starting point standardization | Use CNF algorithm if needed |
  | **2** | Rename non-terminals A₁, A₂, A₃... | Order matters for algorithm | Topological order: No cycles back |
  | **3** | Arrange so Aᵢ → Aⱼα only if i < j | Eliminate backward references | Substitute to forward-only |
  | **4** | Remove left recursion | Can't have A → Aα in GNF | Transform to right-recursive |
  | **5** | Substitute to get terminals first | Final GNF form | Replace non-term starts with terminals |
  
  Additional: Overall O(n^3) time; preserves CFL.
  
  ### **Removing Left Recursion**
  
  **If:** A → Aα | β (left recursive, α/β not starting with A)
  
  **Then:**
  - Introduce new Z
  - A → βZ | β
  - Z → αZ | α
  
  **Example:**
  \`\`\`
  A → Aa | b
  
  Becomes:
  A → bZ | b
  Z → aZ | a
  \`\`\`
  
  **Language:** {b a^n | n≥0} unchanged. Z handles the recursive tail.
  
  Additional: For indirect recursion (A→Bγ, B→Aδ), substitute first.
  
  ### **Complete Example**
  
  **Original:**
  \`\`\`
  S → AB
  A → BS | b
  B → SA | a
  \`\`\`
  
  **Step 1:** Already in CNF ✓ (assuming binary)
  
  **Step 2:** Rename: S=A₁, A=A₂, B=A₃
  \`\`\`
  A₁ → A₂A₃
  A₂ → A₃A₁ | b
  A₃ → A₁A₂ | a
  \`\`\`
  
  **Step 3:** Fix A₂ → A₃A₁ (okay, 3 > 2) ✓
  Fix A₃ → A₁A₂ (problem! 1 < 3, backward)
  
  Substitute A₁ into A₃:
  A₃ → A₂A₃ A₂ | a  (since A₁ → A₂A₃)
  
  **Step 4:** Remove left recursion from A₃ (A₃ → A₂A₃ A₂ | a):
  - α = A₂ A₂, β = a? Wait, pattern A → A γ | β with γ=A₂ A₂, β=a
  - A₃ → a Z | a  (β=a, but adjust)
  - Z → A₂ A₂ Z | A₂ A₂  (γ Z | γ)
  
  **Step 5:** Substitute to get terminals first (complex substitutions...):
  Continue replacing A₂, A₁ with their expansions until all start with terminals.
  
  *Final GNF (simplified):* Productions like S → a α | b β where α,β non-term strings.
  
  Additional: Full expansion tedious; software like ANTLR automates. GNF enables LL(1) parsing without backtracking. Equivalence: Every CFG has GNF form; proves parsing decidability.`
    } as const,
  
    // Practice Questions
    "6926f22d58b12d3aac59b6d6": {
      title: "Practice Questions",
      summary: `## **Practice Problems Summary**
  
  ### **Problem Categories**
  
  | Category | Example Problem | Key Technique | Difficulty | Hints |
  |----------|----------------|---------------|------------|-------|
  | **Even/Odd Counts** | Even 0s AND even 1s | 4-state parity tracker | Medium | Product of two 2-state DFAs |
  | **Pattern Matching** | Contains "aba" as substring | State for each prefix of "aba" | Easy | 4 states: 0(none),1(a),2(ab),3(aba) |
  | **Start/End Conditions** | Starts with 01 OR ends with 01 | Union of two patterns | Medium | NFA union; DFA via subset |
  | **Exact Counts** | Exactly 3 ones in binary string | Counter states (0-3 ones) | Easy | States track count; reject >3 |
  | **Ambiguity Detection** | Check if grammar for expr is ambiguous | Check derivation trees | Hard | Try assoc strings like a+a+a |
  
  Additional: Categories cover 80% exam patterns; practice conversions too.
  
  ### **Key Solutions**
  
  #### **Even 0s AND Even 1s**
  **4 States:** (even0, even1), (even0, odd1), (odd0, even1), (odd0, odd1)
  - Transitions: On 0, flip 0-parity; on 1, flip 1-parity.
  - Start: (even,even); Accept: (even,even).
  - Regex: Complex, but derivable via state elim.
  
  #### **Ambiguity Check**
  **Grammar is ambiguous if:**
  - Both left-recursive AND right-recursive
  - Multiple parse trees for same string
  - Multiple LMD/RMD yielding different trees
  
  **Example (Ambiguous):**
  \`\`\`
  S → S + S | S × S | id
  String: id + id × id (two parse trees: (id+id)×id vs id+(id×id))
  \`\`\`
  
  **Fix:** Introduce precedence: E → E + T | T; T → T × F | F; F → id.
  
  Additional: For DFA: "All strings with even a's and odd b's" — 4 states.
  For CFG: Write G for {a^n b^m | n≠m} — ambiguous? No, but prove CFL.
  Pumping: Use to show {a^n b^n c^n} non-CFL.
  Exam Tips: Draw diagrams; verify with 3-4 test strings; time conversions (5-10 min each).`
    } as const,
  } as const;
  
  type ResourceId = keyof typeof flatSummariesRaw;
  
  type FlatSummaries = {
    [K in ResourceId]: {
      title: typeof flatSummariesRaw[K]['title'];
      summary: typeof flatSummariesRaw[K]['summary'];
    };
  };
  
  export const flatSummaries: FlatSummaries = flatSummariesRaw;
  
  export const hasPreMadeSummary = (resourceId: ResourceId): resourceId is ResourceId => (
    Object.prototype.hasOwnProperty.call(flatSummaries, resourceId)
  );
  
  export const getPreMadeSummary = (resourceId: ResourceId): FlatSummaries[ResourceId] | null => (
    flatSummaries[resourceId] ?? null
  );