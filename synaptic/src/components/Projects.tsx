export default function Projects() {
    return (
        <>
            <h1>Constructs: Applied Knowledge</h1>
            <p>These constructs are tangible results born from abstract ideas. Each project is a self-contained system that addresses a specific challenge, demonstrating a complete cycle of design, implementation, and learning.</p>
            
            <h2>Construct 01: FormuFlash</h2>
            <ul>
                <li><b>Concept</b>: A free, full-featured flashcards application designed for STEM students who need complex notations like <b>Markdown</b> and <b>LaTeX</b>, features that were lacking in existing free tools.</li>
                <li><b>The Challenge</b>: Create a seamless and powerful study tool that handles complex user input, image uploads, and user account management, and make it accessible to everyone.</li>
                <li><b>My Blueprint</b>: I architected and developed the entire application. The frontend was built with <b>React</b> for a dynamic user experience, connected to a robust <b>Django</b> backend with a <b>PostgresQL</b> database to manage all data. The entire system was containerized with <b>Docker</b> and deployed on <b>Google Cloud Platform</b> for scalability.</li>
                <li><b>Neural Takeaway</b>: This project demonstrates my ability to manage a full-stack project from initial concept to live deployment, focusing on creating a direct solution to a personal and widespread problem.</li>
            </ul>
            <a href="https://github.com/carlos-lorenzo/formuflash" target="_blank">Learn more</a>

            <h2>Construct 02: RL from Scratch</h2>
            <ul>
                <li><b>Concept</b>: Train an autonomous agent (car) to navigate a complex circuit from zero understanding.</li>
                <li><b>The Challenge</b>: Instead of relying on pre-built libraries like TensorFlow or PyTorch, the goal was to implement the entire Reinforcement Learning algorithm from first principles to gain a foundational understanding of how an agent truly learns.</li>
                <li><b>My Blueprint</b>: Within the <b>Unity game engine</b> (for graphics), 
                I programmed a complete neural network alongside a genetic algorithm in <b>C#</b>. 
                This included coding fundamental components like <b>matrix multiplication</b>, <b>forward propagation</b>, and the reward-based feedback loops. The agent was successfully trained to drive around a circuit.</li>
                <li><b>Neural Takeaway</b>: This construct proves a deep, theoretical understanding of machine learning fundamentals. It shows a commitment to not just using tools, but fundamentally understanding them.</li>
            </ul>
            <a href="https://github.com/carlos-lorenzo/DrivingML" target="_blank">Learn more</a>

            <h2>Construct 03: BTC-Price-Predictor</h2>
            <ul>
                <li><b>Concept</b>: A system that predicts Bitcoin price movements and makes this data accessible through various frontends.</li>
                <li><b>The Challenge</b>: Train a machine learning model on volatile time-series data and then effectively serve those predictions through a reliable API.</li>
                <li><b>My Blueprint</b>:  I developed a predictive model using <b>Python</b> and <b>scikit-learn</b> to analyze historical price data. This model was then wrapped in an <b>API</b> which was consumed by two separate clients: a <b>Discord bot</b> for real-time community updates and a simple <b>web interface</b> for visual display.</li>
                <li><b>Neural Takeaway</b>: This project highlights my ability to connect a machine learning model to the real world, demonstrating skills in model training, API creation, and front-end integration. It showcases the full pipeline from raw data to end-user application.</li>
            </ul>
            <a href="https://github.com/carlos-lorenzo/BTC-prediction" target="_blank">Learn more</a>
            
            <h2>Key Takeaways</h2>
            <p>These projects highlight my ability to apply abstract concepts to concrete problems, and my commitment to solving real-world challenges through innovative solutions. Not only do I want to convey my current skills but also my adaptability to learn new tools and frameworks to be applied in new areas.</p>
        </>
    )
}