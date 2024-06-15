import { Term } from "../definitions/course";
import { hashEmailAddress } from "../utils";

export const mockReviews: any[] = [
  {
    userId: hashEmailAddress("dsp209@scarletmail.rutgers.edu"),
    semester: Term.Spring,
    year: 2024,
    code: 462,
    title: "Great class but suffers from too much material and lack of preq",
    content: `
This was a great class for those who are interested in machine learning and deep learning. We covered a wide range of topics such as linear regression all the way to generative adversarial networks (GANs). However we really didn't go in depth in any particular topic, it was more like a crash course on a bunch of high level ideas in machine learning and deep learning.

One of the biggest things holding this course back is the lack of prerequisite courses. The only prerequisites for this course are linear algebra and discrete 1 & 2. Because of this, we spend a great deal of time going over the basics of machine learning which really takes away from the deep learning topics and is why we aren't able to that much time going deeper on deep learning topics.

There are no exams in this course. The homeworks were pretty straight forward but can be fairly time consuming so it is best if you start them as early as possible. There are 3 homework assignments which are mostly along the lines of "code a CNN to classify X", "code an RNN to accomplish Y", "explain X in your write up".

For the final project we coded up a neural network which learned how to play minesweeper.
    `,
    professorId: 18,
    rating: 10,
    difficultyRating: 4,
    professorQualityRating: 10,
    lectureRating: 10,
    bookRating: 4,
    piazzaRating: 2,
    workload: 12,
  },
  {
    userId: hashEmailAddress("dsp209@scarletmail.rutgers.edu"),
    semester: Term.Spring,
    year: 2024,
    code: 419,
    title:
      "A lot of topics, easy projects, rote memory based multiple choice exams",
    content: `
As the title sugguests, the class covers a whole lot of pretty interesting computer security topics. 

The lectures can be a bit stale as he is just reading off slides for 3 hours. 

The reading for this class can be a bit annoying (there is typically about 50-70 pages of reading for a given week).

There are weekly quizes which are your standard timed canvas quizes. These were fairly straight forward and easy to do well on if you took your time and did the reading but sometimes the wording of the questions could be a bit confusing.

The projects were pretty easy and most students did fairly well. Project 1 was implementing some basic cryptography algorithms. Project 2 we built a small application which mimicked the blockchain algorithm. Project 3 we worked on to small programs for function interposition.

There were 4 exams and they were all multiple choice. Some questions were set up to confuse you but overall most students did fairly well. The lowest exam was dropped and if you had an A before the final exam you didn't have to take it which was really cool.
0
0
    `,
    professorId: 34,
    rating: 6,
    difficultyRating: 5,
    professorQualityRating: 7,
    lectureRating: 3,
    bookRating: 4,
    piazzaRating: 2,
    workload: 10,
  },
  {
    userId: hashEmailAddress("dsp209@scarletmail.rutgers.edu"),
    semester: Term.Fall,
    year: 2023,
    code: 440,
    title:
      "A lot of topics, easy projects, rote memory based multiple choice exams",
    content: `
This course is outstanding for those who are interested in the more classical and fundemental aspects of AI and agency. The course goes really in depth in areas such as planning and search. Torwards the end we also got to cover some basic machine learning concepts.

This course was mostly project focused with lots of coding involved. There was 3 projects in total. The first project and second project we had to design a logic bot which was capable of traversing a dynamic environment. The final project involved machine learning classification.

The final exam was cumulative and overall pretty fair and simple. Dr. Cowan is an outstanding professor who always goes above and beyond for his students and is very generous with his grading.
`,
    professorId: 18,
    rating: 9,
    difficultyRating: 6,
    professorQualityRating: 10,
    lectureRating: 9,
    bookRating: 4,
    piazzaRating: 2,
    workload: 15,
  },
  {
    userId: hashEmailAddress("kv347@scarletmail.rutgers.edu"),
    semester: Term.Spring,
    year: 2024,
    code: 112,
    title: "Solid Structured Course",
    content: `
Course was structured well, good assignments and fair expectations… except for the spiderman assignment. Spiderman was horrible and we couldnt save bro.
`,
    professorId: 7,
    rating: 8,
    difficultyRating: 8,
    professorQualityRating: 8,
    lectureRating: 8,
    bookRating: 4,
    piazzaRating: 2,
    workload: 20,
  },
  {
    userId: hashEmailAddress("kv347@scarletmail.rutgers.edu"),
    semester: Term.Fall,
    year: 2023,
    code: 111,
    title: "Solid Intro Course",
    content: `
Great structure for an intro cs course. All assignments were well structured, DNA assignment was a little too much, otherwise great course.
`,
    professorId: 6,
    rating: 8,
    difficultyRating: 6,
    professorQualityRating: 10,
    lectureRating: 10,
    bookRating: 4,
    piazzaRating: 2,
    workload: 6,
  },
];
