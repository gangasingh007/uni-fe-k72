// FLAT subject pre-made summaries mapped by resource ID
// These are displayed directly without making API calls

type FlatSummary = { title: string; summary: string };

export const flatSummaries: Record<string, FlatSummary> = {
  "68c807f447b63605991952bf": {
    title: "Flat-1",
    summary: `## **Flat-1.pdf: Foundations of Automata Theory**

### **What is Automata Theory? (Analogy)**
Imagine you're designing a robot to sort colored balls. Automata theory is like asking:
- What kinds of problems can my robot solve?
- How complicated or powerful does it need to be?
- What are the simplest rules it can follow and still do the job?

### **Core Concepts—With Real-Life Examples**
| Concept   | Explanation                                 | Example/Analogy                                  |
|-----------|---------------------------------------------|--------------------------------------------------|
| Symbol    | Single basic unit (like a LEGO brick)       | 'a', 'b', '1', '0' from an alphabet              |
| Alphabet  | Collection of symbols (the LEGO set)        | {a, b} or {0, 1}                                 |
| String    | Row of LEGO bricks (a sequence)             | "abba" or "101"                                  |
| Language  | Box of allowed LEGO models (possible strings)| {"a", "ab", "ba"} (any set of strings)           |

*Analogy:* Building words from English letters. The English alphabet is your set, each word (like "DOG") is a string, and the dictionary is the language (all valid words).

### **How do We Define Languages?**
- **Grammar** (rule-book): Like instructions on how to build allowed LEGO structures (strings).
- **Machines (automata)**: Robots that test if a model (string) is built correctly.

*Example:*
- Alphabet = {a, b}
- Define a language: "all strings that start with 'a'"
    - Strings: "a", "ab", "aa", "aab", etc.

### **Key Point: Kleene Closure**
- Denoted as Σ* (Sigma star for alphabet Σ), represents all possible sequences you can make with your symbols, any length (including zero).
    - If Σ = {a, b}, Σ* = {"", "a", "b", "aa", "ab", "ba", "bb", ...}`
  },

  "68d3d95693b34da2cacd2431": {
    title: "Flat-2",
    summary: `## **Flat-2.pdf: DFA & NFA (with Analogies and Examples)**

### **Transition State Diagram (Traffic Analogy)**
States are like intersections in a city. Arrows are roads, each marked with which color car (symbol) can travel it. The initial state has an entry ramp (starting arrow); final states are flag-marked as destinations.

*Example (String must start with 'a'):*
- **States:** S (start), A (after 'a' seen)
- **Transitions:** From S, 'a' leads to A, 'b' leads to dead-end.

### **Transition Table (Bus Route Table)**
Think of bus stops (states). The table lists where the bus goes ("next stop") for each possible ticket (input) from each stop (state).

| State | 'a' ticket | 'b' ticket |
|-------|------------|------------|
| S     | A          | Dead       |
| A     | A          | B          |
| ...   | ...        | ...        |

- You always know exactly what happens next in a DFA (bus operates on a timetable).

### **DFA—Deterministic Finite Automaton**
- Only one way to go for each input at each state. Like a vending machine with no ambiguity: Press "A" at any time, you get the same snack.

**Example: Accepting strings that end with 'b':**
- States: Start(S), NotEndB, EndB
    - On reading 'b', move to EndB; on reading 'a', remain or move to NotEndB.
    - Only strings finishing at EndB are accepted (e.g., "aab", "b", "babb").

### **NFA—Non-Deterministic Finite Automaton**
- Like a "choose your own adventure" book. For a given input, you might have more than one option at each point—or none!
- The machine "accepts" if at least one choice leads to acceptance.

*Example:* You are in state S and see symbol 'a'. Maybe you can go to states A, B, or even stay in S (multiple possible future paths). It's as if you are running several DFAs in parallel.`
  },

  "68c8082247b63605991952d3": {
    title: "Flat-3",
    summary: `## **Flat-3.pdf: Moore and Mealy Machines (with Analogies and Examples)**

### **Moore Machine Analogies**
- Like an elevator that announces the floor number only when it stops (state-based output).
- The output is determined only by where you are (the current state).

**Example:** Counting "a"s in a string.
- States: 0 (zero 'a's), 1 (one 'a'), 2 (two 'a's)… Up each state for every 'a' read.
- Output: Always show the counter as you enter each state.

*For input "aba":*
- Start at 0 → read 'a' → move to 1 (output 1)
- Read 'b' → stay at 1 (output 1)
- Read 'a' → move to 2 (output 2)
- Output string: 0, 1, 1, 2

### **Mealy Machine Analogies**
- Like a coin sorter that makes a sound instantly each time a coin (input) is detected.
- Output depends on both the current state AND the current coin (input).

**Example:** Count "ab" as a special pattern.
- States: Start, SeenA
- Inputs: 'a' or 'b'
- Outputs a "ding" each time an "ab" is detected (on transition).
    - Read 'a' in Start → move to SeenA (no output)
    - Read 'b' in SeenA → output 1 (transition detected "ab")
    - Read other input: appropriate transitions with/without output.

**Comparison Table: Moore vs Mealy**

| Criteria         | Moore Machine                     | Mealy Machine                                 |
|------------------|----------------------------------|-----------------------------------------------|
| Output Basis     | Only current state                | State and input symbol                        |
| Elevator Analogy | Floor display (changes on arrival)| Chime that sounds as elevator moves (per move)|
| Output Timings   | On entering/being in state        | Instantly on input/transition                 |`
  },

  "68d3a6b781a1f08520a30d46": {
    title: "Flat-4",
    summary: `## **Flat-4.pdf: Conversion Between Moore and Mealy Machines**

### **Main Topics Covered**
- Converting Moore machines to Mealy machines
- Converting Mealy machines to Moore machines
- Step-by-step procedures with examples
- Transition table transformations

### **Key Concepts and Definitions**

#### **Moore to Mealy Conversion**
- **Core Idea:** Move the output from states to transitions (edges).
- **Procedure:** Take the output associated with each state and attach it to all incoming transitions to that state.
- **Result:** Same number of states, but outputs now depend on transitions (state + input) instead of just states.

#### **Mealy to Moore Conversion**
- **Core Idea:** Create new states to represent different outputs that occur on transitions.
- **Procedure:** If a state has multiple incoming transitions with different outputs, create separate states for each output combination.
- **Result:** May have more states than the original Mealy machine (because states are split based on output).

### **Bullet Points & Important Details**
- **Moore → Mealy**: Number of states remains the same; outputs shift from states to transitions.
- **Mealy → Moore**: Number of states may increase; each unique output pattern gets its own state.
- Both machines are **equivalent in power**—they can represent the same input-output behavior.
- Conversion helps optimize based on application (Moore for simpler state-based logic, Mealy for faster response).

### **Analogy: Elevator System**

| Machine Type | Analogy                                                    |
|--------------|-----------------------------------------------------------|
| **Moore**    | Floor display shows number when elevator stops at a floor (output tied to state) |
| **Mealy**    | Elevator beeps immediately when button is pressed (output tied to action/transition) |

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

### **Real-World Example**
**Moore Machine:** Traffic light system where each state (Red, Yellow, Green) has a fixed light output.

**Mealy Machine:** Smart traffic light that changes based on sensor input (car detected + current state = specific light output).`
  },

  "68d3a6c481a1f08520a30d50": {
    title: "Flat-5",
    summary: `## **Flat-5.pdf: Minimization of Finite Automata**

### **Main Topics Covered**
- What is DFA minimization?
- Types of states: Productive vs Non-productive
- Dead states, Unreachable states, Equal (Equivalent) states
- Step-by-step minimization procedure
- Examples with before/after diagrams

### **What is Minimization? (Analogy)**
Think of a company with 10 departments, but 3 of them do the exact same work. Minimization is like consolidating those duplicate departments to save resources while maintaining the same output. The "minimal DFA" is the most efficient version that accepts the same language.

### **Types of States**

| State Type        | Definition                                               | Example/Analogy                          |
|-------------------|----------------------------------------------------------|------------------------------------------|
| **Productive**    | Adds accepting power; affects language recognition       | Cashier who processes transactions       |
| **Dead State**    | Can never reach a final state; dead-end                  | Broken vending machine slot              |
| **Unreachable**   | Cannot be reached from initial state with any input      | Closed office on upper floor             |
| **Equal States**  | Behave identically for all inputs; redundant             | Two clerks doing identical jobs          |

### **Key Points in Bullets**
- **Minimization** removes states that don't change the language the DFA accepts.
- **Dead states**: Created to make DFA complete (handle all inputs), but don't lead to acceptance.
- **Unreachable states**: Never visited during any valid computation path.
- **Equal/Equivalent states**: Two states are equal if, for any input string, they both lead to acceptance or both lead to rejection.
- **Result**: Minimized DFA is **unique** for a given language—there's only one minimal form.

### **Minimization Procedure (Step-by-Step)**

1. **Remove unreachable states**: Eliminate any state you can't get to from the start.
2. **Group states**: Separate final states and non-final states into different groups.
3. **Partition groups**: Within each group, check if states behave the same for all inputs.
   - If two states transition to the same group on all inputs → they are **equivalent**.
   - If not → split them into separate groups.
4. **Merge equivalent states**: Combine equal states into a single state.
5. **Redraw DFA**: Create new transition diagram with merged states.

### **Example: Before and After Minimization**

**Before (5 states):**
\`\`\`
States: q0 (start), q1, q2, q3 (final), q4 (dead)
- q1 and q2 behave identically
- q4 is unreachable
\`\`\`

**After Minimization (3 states):**
\`\`\`
States: q0 (start), q1 (merged q1 and q2), q3 (final)
- Removed q4 (unreachable)
- Merged q1 and q2 (equivalent)
\`\`\`

### **Analogy: Cleaning Your Closet**
- **Dead states** = Broken clothes (keep for completeness but never wear)
- **Unreachable states** = Clothes stored in boxes you never open
- **Equal states** = Multiple identical t-shirts (keep just one)
- **Minimization** = Organized, decluttered closet with only useful items`
  },

  "68d3a6d581a1f08520a30d5a": {
    title: "Flat-6",
    summary: `## **Flat-6.pdf: Block Diagram of Finite Automata**

### **Main Topics Covered**
- Physical/architectural view of how finite automata work
- Components: Input tape, Reading head, Finite control
- How DFA processes strings
- Applications in compiler design

### **Components of Finite Automata**

| Component          | Function                                                  | Analogy                                  |
|--------------------|-----------------------------------------------------------|------------------------------------------|
| **Input Tape**     | Holds the input string in sequential squares             | Assembly line conveyor belt with items  |
| **Reading Head**   | Reads one symbol at a time, moves left to right          | Scanner reading barcodes one by one     |
| **Finite Control** | Brain/decision engine; manages state transitions         | Traffic controller directing cars        |
| **End Markers**    | Mark beginning (⊢) and end (⊣) of input                  | Start/finish line markers in a race     |

### **Key Points in Bullets**
- **Input tape**: Divided into squares, each containing one symbol from the alphabet.
- **Reading head**: Examines one square at a time, moves only to the right (unidirectional).
- **Finite control**: The "brain" that uses the transition function to decide the next state.
- **Deterministic**: For each input symbol at each state, there's exactly one next state (no ambiguity).
- **Applications**: Lexical analysis in compilers, spell checkers, pattern matching.

### **How It Works (Step-by-Step)**

1. **Initialize**: Place reading head at the leftmost symbol (after start marker ⊢).
2. **Read symbol**: Head reads the current symbol on the tape.
3. **Transition**: Finite control uses transition function δ(current_state, symbol) → next_state.
4. **Move right**: Head shifts one square to the right.
5. **Repeat**: Continue until the end marker (⊣) is reached.
6. **Accept/Reject**: If final state is reached → Accept; otherwise → Reject.

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

### **Analogy: Assembly Line Inspector**

| Component       | Assembly Line Analogy                              |
|-----------------|----------------------------------------------------|
| Input Tape      | Conveyor belt with products                        |
| Reading Head    | Inspector examining one product at a time          |
| Finite Control  | Quality control rules (accept/reject criteria)     |
| State Transition| Inspector's checklist (different checks per stage) |
| Acceptance      | Product passes all checks → approved               |

### **Real-World Application: Compiler Lexical Analysis**
When you write code like \`int x = 10;\`, the compiler uses a DFA to:
- Recognize "int" as a keyword (state transitions for i → n → t)
- Recognize "x" as an identifier
- Recognize "=" as an operator
- Recognize "10" as a number literal

Each token is validated by transitioning through states based on character input, just like the reading head on the tape!`
  },

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

### **What is a Regular Expression? (Analogy)**
Think of a regular expression as a **search pattern recipe**. Just like a cooking recipe tells you what ingredients to combine and in what order, a regex tells you what symbols can appear in strings and in what patterns.

### **Basic Building Blocks**

| Symbol/Operation | Meaning | Example | Language Generated |
|------------------|---------|---------|-------------------|
| **a** (symbol) | Single character | \`a\` | {a} |
| **ε (epsilon)** | Empty string | \`ε\` | {""} |
| **∅ (phi)** | Empty set | \`∅\` | { } (no strings) |
| **a + b** (Union) | Either a OR b | \`a+b\` | {a, b} |
| **ab** (Concatenation) | a followed by b | \`ab\` | {ab} |
| **a*** (Kleene Star) | Zero or more a's | \`a*\` | {ε, a, aa, aaa, ...} |
| **a+** (Positive Closure) | One or more a's | \`a+\` | {a, aa, aaa, ...} |

### **Operator Precedence (Top to Bottom)**
1. **Brackets** ( )
2. **Kleene Star** * / **Positive Closure** +
3. **Concatenation** (placing symbols together)
4. **Union** +

*Analogy:* Like math (PEMDAS/BODMAS), regex has an order: parentheses first, then repetition, then sequencing, finally choice.

### **Key Points in Bullets**
- **Regular Language**: Any language that can be described by a regular expression.
- **Equivalence**: Two different regex can generate the same language (e.g., \`(a+b)*\` = \`(a*b*)*\`).
- **One regex → One language**, but **many regex → same language**.
- Regular expressions are used in text editors, search tools, compilers for pattern matching.

### **Example Problems with Solutions**

| Problem | Regular Expression | Explanation |
|---------|-------------------|-------------|
| Ends with "bab" | \`(a+b)*bab\` | Any string, then "bab" at end |
| Contains "aba" | \`(a+b)*aba(a+b)*\` | "aba" anywhere in string |
| Starts and ends with 'a' | \`a(a+b)*a + a\` | 'a', middle anything, 'a' (or single 'a') |
| Starts and ends same | \`a(a+b)*a + b(a+b)*b + a + b\` | Mirror start/end with 'a' or 'b' |
| Equal a's and b's pattern | \`(a^n)(b^n)\` | n a's followed by n b's |

### **Arden's Theorem (Converting DFA to Regex)**
**Formula:** If \`R = Q + RP\` and P doesn't contain ε, then \`R = QP*\`

*Analogy:* Like solving algebraic equations, Arden's theorem solves for a state's regex by isolating it.

**Example Steps:**
1. Write equations for each state showing incoming transitions
2. Substitute equations into each other
3. Apply Arden's theorem to solve for final state regex

### **Algebraic Properties**

| Property | Formula | Example |
|----------|---------|---------|
| Associative | \`(r+s)+t = r+(s+t)\` | Grouping doesn't matter |
| Commutative (Union) | \`r+s = s+r\` | Order in union doesn't matter |
| Distributive | \`r(s+t) = rs+rt\` | Like multiplication in algebra |
| Identity | \`r+∅ = r\`, \`rε = r\` | Empty set/string identities |
| Idempotent | \`r+r = r\` | Repeating union = same |`
  },

  "68d3a70281a1f08520a30d7e": {
    title: "Flat-8",
    summary: `## **Flat-8.pdf: Formal Grammars**

### **Main Topics Covered**
- Formal Grammar Definition (4-tuple)
- Chomsky Hierarchy (Types 0, 1, 2, 3)
- Regular Grammar (Left-linear and Right-linear)
- Converting Grammar ↔ Finite Automata
- Production Rules and Derivations

### **What is Grammar? (Analogy)**
Grammar is like a **sentence construction kit**. Instead of a machine that *recognizes* valid sentences (like DFA), grammar *generates* valid sentences from rules.

### **Formal Grammar Structure**
**4-tuple: G = (VN, Σ, P, S)**

| Component | Meaning | Analogy |
|-----------|---------|---------|
| **VN** | Non-terminals (Variables) | Placeholders/categories (like "Noun", "Verb") |
| **Σ** | Terminals (Alphabet) | Actual words/symbols |
| **P** | Production Rules | Grammar rules for replacement |
| **S** | Start Symbol | Where you begin generating |

### **Chomsky Hierarchy (Type 0-3)**

| Type | Name | Production Form | Machine | Example |
|------|------|----------------|---------|---------|
| **Type 0** | Unrestricted | α → β (any) | Turing Machine | Most powerful, no restrictions |
| **Type 1** | Context-Sensitive | αAβ → αγβ (|γ| ≥ 1) | Linear Bounded Automaton | Length non-decreasing |
| **Type 2** | Context-Free (CFG) | A → γ | Pushdown Automaton | Used in programming languages |
| **Type 3** | Regular | A → aB or A → a | Finite Automaton | Pattern matching, lexical analysis |

*Hierarchy:* Type 3 ⊂ Type 2 ⊂ Type 1 ⊂ Type 0 (each is more powerful)

### **Regular Grammar Types**

| Type | Production Form | Example |
|------|----------------|---------|
| **Right-linear** | A → aB, A → a | S → aA, A → b |
| **Left-linear** | A → Ba, A → a | S → Ab, A → a |

*Note:* Can't mix left and right linear in same grammar!

### **Key Points in Bullets**
- **Derivation**: Process of generating strings from start symbol using production rules.
- **Sentential Form**: Any intermediate string during derivation (can have terminals + non-terminals).
- **Language of Grammar L(G)**: Set of all strings derivable from S that contain only terminals.
- **Reverse substitution NOT allowed**: If S→AB, you can't go backward AB→S.
- Grammar is a **generator**, Automata is a **recognizer**.

### **Example: Grammar to Language**

**Grammar:**
\`\`\`
S → aSb | ε
\`\`\`

**Derivation:**
- S → ε (gives "")
- S → aSb → ab
- S → aSb → aaSbb → aabb
- S → aSb → aaSbb → aaaSbbb → aaabbb

**Language:** L = {aⁿbⁿ | n ≥ 0} = {"", "ab", "aabb", "aaabbb", ...}

### **Converting Grammar ↔ Finite Automata**

**Grammar → FA:**
- Each non-terminal becomes a state
- Production A → aB creates transition: A --a--> B
- Production A → a creates transition: A --a--> (Final State)

**FA → Grammar:**
- Each state becomes a non-terminal
- Transition q0 --a--> q1 becomes production: Q0 → aQ1
- Final state q becomes: Q → ε`
  },

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

### **What is CFG? (Analogy)**
CFG is like a **programming language syntax**. It defines how to construct valid expressions, statements, and programs. Compilers use CFG to parse your code!

### **Key Concepts**

| Concept | Definition | Example |
|---------|-----------|---------|
| **CFG** | Grammar where LHS is always single non-terminal | A → γ |
| **Derivation** | Process of expanding non-terminals into strings | E → E+E → id+E → id+id |
| **Parse Tree** | Graphical representation of derivation | Tree showing how string is derived |
| **Sentential Form** | Any intermediate step in derivation | E+E, id+E (mixed terminals/non-terminals) |

### **Derivation Types**

| Type | Strategy | Abbreviation |
|------|----------|--------------|
| **Left-most Derivation** | Always expand leftmost non-terminal first | LMD |
| **Right-most Derivation** | Always expand rightmost non-terminal first | RMD |

*Analogy:* Like reading a book left-to-right (LMD) vs right-to-left (RMD) - you get to the same ending but take different paths.

### **Ambiguous vs Unambiguous Grammar**

| Type | Definition | Example |
|------|-----------|---------|
| **Ambiguous** | More than one parse tree for same string | E → E+E | E*E | id (for "id+id*id") |
| **Unambiguous** | Exactly one parse tree per string | E → E+T | T, T → T*F | F, F → id |

**Why it matters:** Ambiguous grammars cause problems in compilers (which operation first: + or *?).

### **CFG Simplification Steps**

1. **Remove Null Productions** (A → ε)
2. **Remove Unit Productions** (A → B)
3. **Remove Useless Symbols** (variables that don't derive terminals)

### **Chomsky Normal Form (CNF)**

**Rules:** Every production must be in one of these forms:
- A → BC (two non-terminals)
- A → a (single terminal)

**Why CNF?** Standardized form makes parsing algorithms efficient (like CYK parser).

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

*Final result: All productions in CNF!*`
  },

  "68d3a73081a1f08520a30da5": {
    title: "Flat-10",
    summary: `## **Flat-10.pdf: Advanced FA Topics**

### **Main Topics Covered**
- Two-Way Finite Automata (2FA)
- Practice problems for DFA design
- Regular expression examples
- Even/odd pattern acceptance

### **Two-Way Finite Automata (2FA)**

**Key Difference from DFA:**
- **DFA**: Tape head moves only RIGHT →
- **2FA**: Tape head can move LEFT ← or RIGHT →

**Transition Function:** δ(Q × Σ) → Q × {L, R}
- Not just "next state" but also "direction to move"

### **Analogy: Reading a Book**
- **DFA**: You can only turn pages forward (one-way reader)
- **2FA**: You can flip back to re-read sections (can move both ways)

### **Example Practice Problems**

| Problem | Solution Approach | Regular Expression |
|---------|------------------|-------------------|
| Even 0s and even 1s | 4 states tracking parity | \`(00+11+(01+10)(01+10)*01+10))*\` |
| Even 0s followed by single 1 | Chain: even-0 states → transition on 1 → final | \`(00)*1\` |
| Even length strings | 2 states (even/odd position) | \`((a+b)(a+b))*\` |
| Odd number of 1s | 2 states (odd/even 1-count) | \`0*10*(10*10*)*\` |

### **Key Points in Bullets**
- **2FA** is more powerful for recognition but equivalent to DFA in accepting power (can convert 2FA → DFA).
- **Parity problems** (even/odd counts) require state tracking.
- Combining multiple conditions (e.g., even 0s AND odd 1s) requires Cartesian product of states.
- Regular expressions and DFAs are **equivalent** - can always convert between them.`
  },
  
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

### **Grammar ↔ Automata Conversions**

#### **Regular Grammar → Regular Expression**
Using **substitution and algebraic manipulation** to eliminate states.

**Example:**
\`\`\`
S → 01S | 01
\`\`\`
- S = 01S + 01
- Apply Arden's: S = 01(01)* = (01)⁺

#### **Regular Grammar → Finite Automata**
- Each non-terminal = state
- Production A → aB creates: A --a--> B
- Production A → a creates: A --a--> Final State

#### **Finite Automata → Grammar**
Reverse process:
- Transition q₀ --a--> q₁ becomes: Q₀ → aQ₁
- Final state q becomes: Q → ε

### **CFG Simplification Steps**

| Step | What to Remove | Why |
|------|---------------|-----|
| **1. Null Productions** | A → ε | Creates ambiguity, complicates parsing |
| **2. Unit Productions** | A → B (single non-terminal) | Redundant, adds unnecessary steps |
| **3. Useless Symbols** | Variables that don't contribute to derivations | Dead code, wastes resources |

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

*Trick:* For each nullable variable, create versions with/without it.

### **Normal Forms Comparison**

| Normal Form | Production Format | Key Benefit | Usage |
|-------------|------------------|-------------|-------|
| **CNF** | A → BC or A → a | Parsing in O(n³) time | CYK parser, theoretical analysis |
| **GNF** | A → aα (terminal first) | Parsing in O(n) steps | Top-down parsers, simplifies analysis |
| **KNF** | Context-sensitive rules | For Type-1 grammars | Linear bounded automata |

### **Chomsky Normal Form (CNF) Details**

**Rules:**
- A → BC (two non-terminals)
- A → a (single terminal)

**Properties:**
- For string length n, derivation uses **exactly 2n-1 productions**
- Number of sentential forms = 2n-1

**Analogy:** CNF is like binary trees - every node has exactly 2 children (non-terminals) or is a leaf (terminal).

### **Greibach Normal Form (GNF) Details**

**Rules:**
- A → aα where a is terminal, α is string of non-terminals

**Properties:**
- For string length n, derivation uses **exactly n productions**
- Number of sentential forms = n
- **More efficient than CNF!**

**Analogy:** GNF is like an assembly line - each step produces exactly one output item (terminal), then passes work to next stations (non-terminals).`
  },

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

### **What is PDA? (Analogy)**
A PDA is like a **DFA with a notepad (stack)**. While processing input, it can write notes (push), read notes (pop), or ignore notes (skip). This extra memory lets it recognize context-free languages.

### **Components of PDA**

| Component | Function | Analogy |
|-----------|----------|---------|
| **Input Tape** | Holds the input string | Assembly line with items |
| **Finite Control** | State machine logic | Quality inspector's checklist |
| **Stack** | Infinite memory (LIFO) | Stack of plates |

### **Formal Definition: 7-Tuple**
**PDA = (Q, Σ, Γ, δ, q₀, Z₀, F)**

| Symbol | Meaning |
|--------|---------|
| Q | Finite set of states |
| Σ | Input alphabet |
| Γ | Stack alphabet (symbols that can be on stack) |
| δ | Transition function: Q × (Σ ∪ {ε}) × Γ → 2^(Q × Γ*) |
| q₀ | Initial state |
| Z₀ | Initial stack symbol (bottom marker) |
| F | Set of final states |

### **Stack Operations**

| Operation | Notation | Before | After | Meaning |
|-----------|----------|--------|-------|---------|
| **PUSH** | a, Z₀/aZ₀ | Z₀ | aZ₀ | Add 'a' on top of Z₀ |
| **POP** | a, Z/ε | Z | (empty) | Remove Z from stack |
| **SKIP** | a, Z/Z | Z | Z | No stack change |

**Important:** Only **one symbol** can be pushed at a time!

### **DPDA vs NPDA**

| Feature | DPDA | NPDA |
|---------|------|------|
| Transitions | At most one per (state, input, stack) | Can have multiple |
| Acceptance Power | **Subset** of CFLs | **All** CFLs |
| Equivalence | NOT equivalent to NPDA | More powerful |
| Examples | L = {aⁿbⁿ} | L = {wwᴿ} (palindromes) |

*Key Insight:* Unlike DFA ≡ NFA, **DPDA ≠ NPDA**. Non-determinism adds power for CFLs!

### **Example: PDA for aⁿbⁿ (n ≥ 1)**

**Strategy:**
1. Push 'a' for each input 'a'
2. Pop 'a' for each input 'b'
3. Accept if stack is empty at end

**Transitions:**
\`\`\`
q₀ --a,Z₀/aZ₀--> q₀  (Push first 'a')
q₀ --a,a/aa--> q₀     (Push more 'a's)
q₀ --b,a/ε--> q₁      (Start matching 'b's)
q₁ --b,a/ε--> q₁      (Continue matching)
q₁ --ε,Z₀/ε--> q₂     (Accept when stack empty)
\`\`\`

### **Instantaneous Description (ID)**

**Format:** (state, remaining_input, stack_contents)

**Example for input "aabb":**
\`\`\`
(q₀, aabb, Z₀) ⊢ (q₀, abb, aZ₀) ⊢ (q₀, bb, aaZ₀) 
⊢ (q₁, b, aZ₀) ⊢ (q₁, ε, Z₀) ⊢ (q₂, ε, ε) ACCEPT
\`\`\`

*Analogy:* Like a video game save state - captures exact moment of computation.

### **Decision Properties of CFLs**

| Property | Decidable? | Method |
|----------|-----------|--------|
| **Emptiness** | ✅ Yes | Check if start symbol derives any terminal |
| **Finiteness** | ✅ Yes | Check for loops/cycles in derivation |
| **Membership** | ✅ Yes | Parse the string (CYK algorithm) |
| **Equality** | ❌ No | Undecidable for CFLs |
| **Ambiguity** | ❌ No | Undecidable for CFLs |

### **Closure Properties**

**CFLs ARE closed under:**
- Union ✅
- Concatenation ✅
- Kleene Star ✅
- Substitution ✅

**CFLs are NOT closed under:**
- Intersection ❌
- Complement ❌

**Important Exception:** CFL ∩ Regular = CFL (intersection with regular language IS closed!)

### **Two-Stack PDA**

A PDA with **two independent stacks** is as powerful as a **Turing Machine**! Can recognize Type-0 languages.

**Example:** L = {aⁿbⁿcⁿ}
- Stack 1: Track 'a's vs 'b's
- Stack 2: Track 'b's vs 'c's`
  },

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

### **What is a Turing Machine? (Analogy)**
A Turing Machine is like a **super-powered computer** with unlimited memory (infinite tape) and complete control (can read, write, move both ways). It's the **most powerful** computational model.

### **Why Turing Machines Matter**

| Use Case | Description |
|----------|-------------|
| **Universal Model** | Accepts Type-0 (unrestricted) languages |
| **Decidability** | Determines which problems are solvable |
| **Complexity** | Measures time and space requirements |
| **Theoretical Limit** | Defines what is computable |

### **Components of Turing Machine**

| Component | Description | Key Feature |
|-----------|-------------|-------------|
| **Infinite Tape** | Unlimited memory cells | Can move LEFT or RIGHT |
| **Read/Write Head** | Reads, writes, moves | Both input and output |
| **Finite Control** | State machine | Decision logic |
| **Blank Symbol (B)** | Empty cell marker | Extends tape infinitely |

**Key Difference from PDA:** TM can **write** to tape, move **both directions**, and tape is **infinite**.

### **Formal Definition: 7-Tuple**
**TM = (Q, Σ, Γ, δ, q₀, B, F)**

| Symbol | Meaning |
|--------|---------|
| Q | Finite set of states |
| Σ | Input alphabet |
| Γ | Tape alphabet (Σ ⊂ Γ, includes B) |
| δ | Transition function: Q × Γ → Q × Γ × {L, R} |
| q₀ | Initial state |
| B | Blank symbol (B ∈ Γ, B ∉ Σ) |
| F | Set of final states |

### **Example: TM for L = {aⁿbⁿ | n ≥ 1}**

**Strategy:**
1. Mark first 'a' with X
2. Find first 'b', mark with Y
3. Return to start
4. Repeat until all matched
5. Accept if all become X and Y

**Visual:**
\`\`\`
Input: aaabbb
Step 1: XaabbbY
Step 2: XXabbYY
Step 3: XXXbYYY
Step 4: XXXYYYY → ACCEPT
\`\`\`

### **Instantaneous Description (ID)**

**Format:** α q β
- α = tape contents to left of head
- q = current state
- β = symbol under head + tape to right

**Example:**
\`\`\`
Initial: q₀aaabbb
After 1: Xq₁aabbb
After 2: Xaq₁abbb
...
Final: XXXYYYq_accept
\`\`\`

### **Variants of Turing Machines**

| Variant | Description | Power vs Standard TM |
|---------|-------------|---------------------|
| **Multi-tape TM** | Multiple tapes with independent heads | Equivalent (can simulate) |
| **Multi-dimensional TM** | 2D or 3D tape | Equivalent |
| **Non-deterministic TM** | Multiple possible transitions | Equivalent (but faster) |
| **Two-way Infinite Tape** | Infinite in both directions | Equivalent |
| **Semi-infinite Tape** | Infinite only to right | Equivalent |
| **Stay Option TM** | Can stay in place (not move L/R) | Equivalent |

**Key Insight:** All variants are **computationally equivalent** - they can all simulate each other!`
  },

  // Greibach Normal Form
  "6926f09c58b12d3aac59b6cf": {
    title: "Greibach Normal Form",
    summary: `## **Greibach-normal-form.pdf: GNF Conversion Algorithm**

### **Main Topics Covered**
- Step-by-step GNF conversion procedure
- Handling left recursion
- Substitution techniques
- Worked examples

### **GNF Conversion Steps**

| Step | Action | Purpose |
|------|--------|---------|
| **1** | Ensure grammar is in CNF | Starting point standardization |
| **2** | Rename non-terminals A₁, A₂, A₃... | Order matters for algorithm |
| **3** | Arrange so Aᵢ → Aⱼα only if i < j | Eliminate backward references |
| **4** | Remove left recursion | Can't have A → Aα in GNF |
| **5** | Substitute to get terminals first | Final GNF form |

### **Removing Left Recursion**

**If:** A → Aα | β (left recursive)

**Then:**
- A → βZ | β
- Z → αZ | α

**Example:**
\`\`\`
A → Aa | b

Becomes:
A → bZ | b
Z → aZ | a
\`\`\`

### **Complete Example**

**Original:**
\`\`\`
S → AB
A → BS | b
B → SA | a
\`\`\`

**Step 1:** Already in CNF ✓

**Step 2:** Rename: S=A₁, A=A₂, B=A₃
\`\`\`
A₁ → A₂A₃
A₂ → A₃A₁ | b
A₃ → A₁A₂ | a
\`\`\`

**Step 3:** Fix A₂ → A₃A₁ (okay, 3 > 2) ✓
Fix A₃ → A₁A₂ (problem! need 3 > 1)

Substitute A₁:
\`\`\`
A₃ → A₂A₃A₂ | a
\`\`\`

**Step 4:** Remove left recursion from A₃:
\`\`\`
A₃ → aZ | a
Z → A₂Z | A₂
\`\`\`

**Step 5:** Substitute to get terminals first (complex substitutions...)`
  },

  // Practice Questions
  "6926f22d58b12d3aac59b6d6": {
    title: "Practice Questions",
    summary: `## **Practice Problems Summary**

### **Problem Categories**

| Category | Example Problem | Key Technique |
|----------|----------------|---------------|
| **Even/Odd Counts** | Even 0s AND even 1s | 4-state parity tracker |
| **Pattern Matching** | Contains "aba" | State for each prefix |
| **Start/End Conditions** | Starts with 01 OR ends with 01 | Union of two patterns |
| **Exact Counts** | Exactly 3 ones | Counter states |
| **Ambiguity Detection** | Left & right recursive | Check derivation trees |

### **Key Solutions**

#### **Even 0s AND Even 1s**
**4 States:** (even0, even1), (even0, odd1), (odd0, even1), (odd0, odd1)

#### **Ambiguity Check**
**Grammar is ambiguous if:**
- Both left-recursive AND right-recursive
- Multiple parse trees for same string

**Example (Ambiguous):**
\`\`\`
S → S + S | S × S | id
String: id + id × id (two parse trees!)
\`\`\`
`
  }
};

export const hasPreMadeSummary = (resourceId: string): boolean => (
  Object.prototype.hasOwnProperty.call(flatSummaries, resourceId)
);

export const getPreMadeSummary = (resourceId: string): FlatSummary | null => (
  flatSummaries[resourceId] || null
);
