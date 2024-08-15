import Post from '../models/post.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

async function insertPostData(){
    await Post.deleteMany({});
    Post.insertMany([
        {
            title: 'The Importance of Software Testing',
            body: 'Software testing is a crucial step in the software development lifecycle. It helps identify bugs, errors, and vulnerabilities in the code, ensuring that the software functions as intended. Effective testing practices can improve the quality and reliability of software, leading to better user experiences and customer satisfaction.',
            author: '66b60ce1b8fe2697f9ba1f1f',
        },
        {
            title: 'The Role of Agile Methodology in Software Development',
            body: 'Agile methodology is a popular approach to software development that emphasizes flexibility, collaboration, and iterative development. It allows teams to adapt to changing requirements and deliver high-quality software in shorter timeframes. By breaking down projects into smaller, manageable tasks, Agile methodology promotes efficiency and customer-centricity.',
            author: '66b60ce1b8fe2697f9ba1f1f',
        },
        {
            title: 'The Benefits of Continuous Integration and Deployment',
            body: 'Continuous Integration (CI) and Continuous Deployment (CD) are practices that automate the process of integrating code changes and deploying software updates. CI/CD pipelines enable faster and more frequent releases, reduce the risk of errors, and improve collaboration among development teams. These practices are essential for modern software development.',
            author: '66b60ce1b8fe2697f9ba1f1f',
        },
        {
            title: 'The Rise of DevOps in Software Engineering',
            body: 'DevOps is a cultural and technical movement that aims to bridge the gap between software development and operations. By promoting collaboration, automation, and continuous improvement, DevOps enhances the efficiency and reliability of software delivery. It enables organizations to deliver high-quality software at a faster pace.',
            author: '66b60ce1b8fe2697f9ba1f1f',
        },
        {
            title: 'The Importance of User-Centered Design in Software Development',
            body: 'User-Centered Design (UCD) is an approach that focuses on understanding users\' needs, preferences, and behaviors to create software that meets their expectations. By involving users throughout the development process, UCD ensures that software is intuitive, accessible, and enjoyable to use. It leads to higher user satisfaction and adoption rates.',
            author: '66b60ce1b8fe2697f9ba1f1f',
        },
        {
            title: 'The Role of Artificial Intelligence in Software',
            body: 'Artificial Intelligence (AI) is revolutionizing the software industry by enabling machines to perform tasks that typically require human intelligence. From chatbots to recommendation systems, AI-powered software can automate processes, analyze vast amounts of data, and make intelligent decisions. It has the potential to transform various sectors and enhance user experiences.',
            author: '66b60ce1b8fe2697f9ba1f1f',
        },
        {
            title: 'The Importance of Data Privacy in Software Applications',
            body: 'Data privacy is a critical concern in today\'s digital age. Software applications must adhere to strict privacy regulations and protect users\' personal information. Implementing robust security measures, encryption techniques, and privacy policies ensures that sensitive data remains confidential and secure. Trustworthy software applications prioritize user privacy and build customer trust.',
            author: '66b60ce1b8fe2697f9ba1f1f',
        },
        {
            title: 'The Role of Cloud Computing in Modern Software Development',
            body: 'Cloud computing has revolutionized the way software is developed, deployed, and managed. It provides scalable infrastructure, on-demand resources, and cost-effective solutions for software applications. Cloud platforms enable developers to focus on coding rather than infrastructure management, accelerating the software development process and improving scalability and reliability.',
            author: '66b60ce1b8fe2697f9ba1f1f',
        },
        {
            title: 'The Benefits of Open Source Software in Development',
            body: 'Open Source Software (OSS) refers to software that is freely available, allowing users to view, modify, and distribute the source code. OSS promotes collaboration, innovation, and transparency in software development. It enables developers to leverage existing solutions, customize software to meet specific needs, and contribute to the larger software community.',
            author: '66b60ce1b8fe2697f9ba1f1f',
        },
        {
            title: 'The Role of Mobile Applications in Today\'s Software Landscape',
            body: 'Mobile applications have become an integral part of our daily lives, offering convenience, connectivity, and personalized experiences. With the increasing use of smartphones and tablets, mobile app development has gained significant importance. Developing user-friendly, responsive, and feature-rich mobile applications is crucial for businesses to stay competitive in the digital market.',
            author: '66b60ce1b8fe2697f9ba1f1f',
        }
    ]).then(() => {
        console.log('Data inserted');
        mongoose.connection.close();
    }).catch((err) => {
        console.log(err);
    });
};

insertPostData();