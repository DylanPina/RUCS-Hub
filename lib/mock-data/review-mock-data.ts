import { Term } from "../definitions/course";
import { hashEmailAddress } from "../utils";

export const mockReviews: any[] = [
  {
    userId: hashEmailAddress("dsp209@scarletmail.rutgers.edu"),
    semester: Term.Spring,
    year: 2024,
    courseCode: 462,
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
];
