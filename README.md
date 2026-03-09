
    - 1️⃣ What is the difference between var, let, and const?

    	var: A legacy declaration that creates a variable with function scope (or global scope). It is hoisted to the top of its scope and initialized as undefined, allowing it to be accessed before the declaration line. It is permissive, meaning it allows both redeclaration and reassignment.

      let: A modern declaration that creates a block-scoped variable. It is hoisted to the top of its block but remains in a   Temporal Dead Zone, meaning it cannot be accessed until the code execution reaches the declaration. It allows reassignment but prohibits redeclaration within the same scope.

	    const: A modern declaration that creates a block-scoped constant reference. Like let, it is subject to the Temporal Dead Zone. It forbids both redeclaration and reassignment; the binding must be initialized at the time of declaration and cannot be pointed to a new value later.


    - 2️⃣ What is the spread operator (...)?
      The spread operator (...) is a powerful, concise syntax in JavaScript that allows an iterable (like an array, string, or object) to be expanded into places where zero or more arguments or elements are expected

    - 3️⃣ What is the difference between map(), filter(), and forEach()?

     forEach() (The Iterative Method): A higher-order function that executes a provided callback function once for each element in an array. By definition, it is imperative—it is intended to perform side effects (like updating an external variable, logging, or DOM manipulation) rather than producing a transformed data set. It is "purely procedural" in that it expects no return value and always returns undefined.

     map() (The Transformation Method): A higher-order function that creates a new array populated with the results of calling a provided function on every element in the calling array. It is declarative and mapping-based; it maintains a one-to-one correspondence between the input array and the output array, making it ideal for data transformation without mutating the original source.

     filter() (The Conditional Selection Method): A higher-order function that creates a new array with all elements that pass the test implemented by the provided callback function (i.e., the callback returns a truthy value). It is a subset-producing method; it does not transform the individual elements, but rather restricts the set based on a predicate condition.

    - 4️⃣ What is an arrow function?
      An arrow function (introduced in ES6) is a concise, modern syntax for writing JavaScript functions. Beyond just being a shorter way to type a function, arrow functions have distinct behavioral differences from traditional function declarations—most notably regarding the this keyword.

    - 5️⃣ What are template literals?
      Template literals are a modern, robust way to handle strings in JavaScript, introduced in ES6. They are defined by enclosing text in backticks (`) instead of the traditional single (') or double (") quotes.


