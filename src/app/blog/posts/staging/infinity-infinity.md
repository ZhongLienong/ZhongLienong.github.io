---
title: "Infinity vs Infinity"
date: "2025-05-22"
excerpt: "A brief introduction to Cantor's diagonalization"
tags: ["Mathematics"]
author: "Zhu Han Wen"
---

Imagine you’re trying to make a list of all real numbers between 0 and 1:

- 0.123456789
- 0.987654321
- 0.192837465
- ...

It may require some work, but it seems doable, doesn't it?
But the great mathematician Georg Cantor showed something shocking in the late 1800s:
> Even if you list forever, some numbers will always be missing!

#### Cantor's Diagonal Argument

Suppose by contradiction that all real numbers in the interval (0, 1) can be listed as an countably infinite sequence:

$$
\begin{aligned}
r_1 &= 0.d_{11}d_{12}d_{13}\dots \\
r_2 &= 0.d_{21}d_{22}d_{23}\dots \\
r_3 &= 0.d_{31}d_{32}d_{33}\dots \\
&\vdots
\end{aligned}
$$

Each $r_i$ is a real number between 0 and 1, written in decimal expansion.

Now we construct a new number $r$ as follows:

$$
r = 0.c_1 c_2 c_3 \dots
$$

Where:

$$
c_n =
\begin{cases}
1 & \text{if } d_{nn} \neq 1 \\
2 & \text{if } d_{nn} = 1 \\
\end{cases}
$$

(This rule ensures $c_n \neq d_{nn}$ for all $n$.)

By construction, $r$ differs from $r_n$ in the $n^\text{th}$ digit:

$$
r \neq r_n \quad \text{for all } n
$$

So:

$$
r \notin \{r_1, r_2, r_3, \dots\}
$$

This contradicts our assumption that we had listed all real numbers in (0, 1).

> Therefore, the real numbers in (0, 1) are uncountable.