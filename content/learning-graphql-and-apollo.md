# Learning GraphQL and Apollo

1632884820

Today was a good day.

It took me approximately 3 or 4 months to become fully comfortable with the traditional RESTful API and database experience with both SQL and MongoDB, and that was with an instructor paid to help us understand. 

Today, it only took me a couple hours of development time to get my [sanity.io](https://www.sanity.io/) content working with this scratch built [React.js](https://reactjs.org/) blog using [GraphQL](https://graphql.org/) and [Apollo](https://www.apollographql.com/). 

*2023 Edit: the current website you're looking at uses an entirely different stack. See [this post](https://www.kojinglick.com/using-github-as-cms).*

Of course I'm not remotely a pro at using GraphQL, but I'm starting to see why it's appearing in more and more tech stacks for web developers. I'll outline what I'm seeing at this stage, more to see in a few months how much of an absolute newbie I'm being at this moment. 

Compared to RESTful APIs, where most of the logic happens in controllers, middleware, and the arcane realm of the back-end, GraphQL presents itself as easier to manage as a front-end developer. Imagine the following scenario before GraphQL. A client is asking for a simple change to the layout, and as they aren't web-savvy, they're doing it in graphical terms. I want the categories of the posts to be *here*, the guy points to a spot on the mock up. The front-end developer, who the client is facing, nods their head but they know that in order to access that information, (let's assume at the very least it is stored in the database,) they're going to have to chat with the person responsible for building the controller for the API, who at the very least needs to add that requested information, namely the string values of the categories. 

With GraphQL, all of the information that is stored in the database is readily accessible to the front-end developer. As soon as the client makes that request, the front-end developer can restructure their query to include the information, making it much smoother of a process to access that information and iterate in terms that are comfortable with the tech-savless client. 

Well, at least that's how I imagine the strengths of this query language, you know, after using it for like maybe 90 minutes. I'm excited to find the limitations of the language, especially since I found out that a company that my friend is working at is actually switching back from GraphQL to RESTful APIs to transport data to the front-end. It seems, though, that in his case, he was dealing with lazy use of the query language, where the front-end folks were asking for way too much information and really blowing the performance of their product. GraphQL does seem a tad slower than a RESTful API, but for most use cases, I don't think it's a major performance issue.







