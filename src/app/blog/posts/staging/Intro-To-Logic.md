---
title: "Building Truth"
date: "2025-05-22"
excerpt: "A brief introduction to formal systems"
tags: ["Mathematics", "Computer Science"]
series: "What does it take to solve a problem?"
seriesOrder: 1
author: "Zhu Han Wen"
---

## Preface

My favorite courses at McGill University were theoretical computer science fundamentals: COMP302, COMP330, and COMP360. Even though I thoroughly enjoyed them, I've found fewer chances to utilize these concepts in my job as a programmer than I would have liked. To prevent this valuable knowledge from fading and to share my ongoing fascination, I'm launching this blog series. It will be a space for me to revisit and explore these core theoretical computer science topics, acting as both a personal learning log and a platform for knowledge sharing.

This series isn’t a textbook. I won’t cover formal proofs or every technical wrinkle. But I do want to introduce some of the key ideas, and more importantly, the strange places they lead.

--- 

## Foundations of Reasoning: Introduction to Formal System

To talk rigorously about truth, proof, and paradoxes, we first need to understand the machinery that underpins them all: the **formal system**.

### What Is a Formal System?

A **formal system** is a rigorously defined framework for reasoning. It consists of:

- **A Language**: A set of symbols and syntactic rules for forming statements
- **Axioms**: A set of statements we accept as starting truths (the *trust-me-bro* set of statements)
- **Inference rules**: Rules for deriving new statements from existing ones

Within such a system, we can ask:  
- Is the statement **provable** (can we derive it using the axioms and the inference rules)?  
- Is the statement **valid** (does the derivation follow the axioms and the inference rules)?  
- Is the system **sound** (are all statements derived using the axioms and the inference rules true under all interpretations)?
- Is the system **consistent** (does it never prove contradicting statements)?  
- Is the system **complete** (does it prove every statement that is sound)?  
- Is the system **decidable** (can we always tell, via an algorithm, whether a statement is provable)?

Let’s see some examples.

#### Propositional Logic

Propositional logic deals with atomic statements like "I like rock music” or “The grass is always greener on the other side”, which can be either true or false. They can be combined using logical connectives like **$\wedge$ (and)**, **$\vee$ (or)**, and **$\lnot$ (not)**, and we use **Modus Ponens** to derive new truths. 
- **Modus Ponens**: Given a conditional statement $P \rightarrow Q$(if $P$, then $Q$) and a fact that $P$ is true, we conclude that $Q$ *must* be true.

**Modus Ponens** is **sound**, so if *both* the conditional statement and the antecedent are true, then the consequent *must* be true. Here is an example:

> I am playing Rainbow Six Siege $\rightarrow$ I am having fun 

If we take it as a true statement, and I am playing Rainbow Six Siege, we can firmly conclude that I am having fun.

Propositional logic is a **decidable** formal system. We can write an algorithm to determine whether any statement is a **tautology**(always true), **contradiction**(always false), or **satisfiable**(conditionally true).

But propositional logic is limited. It can't express "For all numbers $x$, if $x$ is even, then $x+1$ is odd." For that, we need something more expressive.


#### Predicate Logic

Propositional logic is great for combining simple true/false statements, but it can’t talk about individual elements inside a domain, like numbers, people, or files. That’s where predicate logic (also called first-order logic) comes in.

It introduces two key ideas in addition to everything we have in **Propositional Logic**:

- **Variables**: arbitrary elements in a domain. For example, $x$ might range over natural numbers.

- **Quantifiers**: allow us to express statements about all or some elements.

There are two main quantifiers:

- **$\forall$** (“for all”): a universal quantifier

- **$\exists$** (“there exists”): an existential quantifier

With these, we can write powerful, general statements. For example:

> $\forall x \in \mathbb{N}\text{. } \text{Even}(x) \rightarrow \text{Odd}(x + 1)$ (“For all natural numbers $x$, if $x$ is even, then $x + 1$ is odd.”)

### The Liar's Paradox

The classic Liar Paradox says:

> "This sentence is false."

If it's true, then it must be false. If it's false, then it's true. Either way, we’re stuck.

Let's try to construct this paradox rigorously.

Now suppose we extend our tiny system by allowing it to encode statements about provability. We invent a special predicate Provable(ϕ) which is true if the statement ϕ is provable in our system.

Then, we construct a new statement:

G: "This statement is not provable."
More formally: G ≡ ¬Provable(G)

Now ask: Is G provable?

If it is, then our system proves something that claims it’s not provable → contradiction.

If it isn’t, then what G says is true — so it’s a true but unprovable statement.

We’ve broken completeness: there exists a true statement that the system cannot prove.

But there’s a deeper issue here. The problem wasn’t just this sentence. The problem is that we allowed the system to talk about itself. This isn’t just about G — it’s a meta-problem.