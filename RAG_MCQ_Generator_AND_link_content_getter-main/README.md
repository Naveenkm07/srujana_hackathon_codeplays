# RAG MCQ Generator and Link Content Getter

A Python-based educational tool that combines **Retrieval Augmented Generation (RAG)** with **Large Language Models (LLMs)** to generate multiple-choice questions from PDF documents and extract educational content from web links.

## 🚀 Features

### 1. **MCQ Generator from PDF**
- **PDF Processing**: Load and process PDF documents using PyPDFLoader
- **Text Chunking**: Split documents into manageable chunks with overlap for better context
- **Vector Embeddings**: Generate embeddings using HuggingFace sentence transformers
- **RAG Implementation**: Use ChromaDB for vector storage and retrieval
- **MCQ Generation**: Generate high-quality multiple-choice questions using Groq's Llama 3.3 model
- **Customizable**: Adjustable number of questions and difficulty levels

### 2. **Educational Link Content Getter**
- **Web Search**: Find top 5 educational English links using DuckDuckGo Search API
- **Content Extraction**: Extract and process content from web pages
- **Smart Filtering**: Filter results to include only English educational domains (.com, .edu, .org, .net)
- **Content Formatting**: Format extracted content with source attribution and preview limits

## 🛠️ Technologies Used

- **LangChain**: Framework for building LLM applications
- **Groq**: High-performance LLM inference platform with Llama 3.3
- **ChromaDB**: Vector database for embeddings storage and retrieval
- **HuggingFace Transformers**: Sentence embeddings using `all-MiniLM-L6-v2`
- **DuckDuckGo Search (DDGS)**: Privacy-focused search API
- **PyPDFLoader**: PDF document processing
- **WebBaseLoader**: Web content extraction

## 📋 Prerequisites

- Python 3.8+
- Groq API Key (get from [Groq Console](https://console.groq.com/))
- Internet connection for web scraping and API calls

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd RAG_MCQ_Generator_AND_link_content_getter-main
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Set up environment variables**
```bash
# Set your Groq API key
export GROQ_API_KEY="your_groq_api_key_here"

# On Windows
set GROQ_API_KEY=your_groq_api_key_here
```

## 🔧 Usage

### MCQ Generator from PDF

```python
from langchain_groq import ChatGroq
from langchain.document_loaders import PyPDFLoader
# ... other imports

# 1. Load PDF
loader = PyPDFLoader("your_document.pdf")
documents = loader.load()

# 2. Process and generate MCQs
# Run the MCQ generation code from the notebook
```

**Example Output:**
```
Q1. What is the purpose of the `displayQ()` function in the given code?
A) To insert an element into the queue
B) To delete an element from the queue
C) To display the elements in the queue
D) To create a new node

Correct Answer: **C**
```

### Educational Link Content Getter

```python
from ddgs import DDGS

# Search for educational content
query = "Python programming tutorial for students"
links = get_top5_english_edu_links(query)

# Extract content from links
docs = load_content_webbaseloader(links)
formatted_docs = format_docs(docs, preview_chars=1500)
```

## 📁 Project Structure

```
RAG_MCQ_Generator_AND_link_content_getter-main/
│
├── 002.ipynb              # Main Jupyter notebook with all functionality
├── README.md              # Project documentation
├── requirements.txt       # Python dependencies
└── DataStructuresNotes1.pdf  # Sample PDF (referenced in code)
```

## 🔍 Code Components

### MCQ Generation Pipeline
1. **Document Loading**: PyPDFLoader loads PDF files
2. **Text Splitting**: RecursiveCharacterTextSplitter creates chunks
3. **Embedding Generation**: HuggingFaceEmbeddings creates vector representations
4. **Vector Storage**: ChromaDB stores and indexes embeddings
5. **Retrieval**: Similarity search finds relevant chunks
6. **Generation**: Groq LLM generates MCQs with proper formatting

### Web Content Extraction Pipeline
1. **Search**: DuckDuckGo API finds relevant educational links
2. **Filtering**: Domain-based filtering for English educational content
3. **Content Loading**: WebBaseLoader extracts page content
4. **Formatting**: Structured formatting with source attribution

## 🎯 Key Functions

| Function | Purpose |
|----------|---------|
| `get_top5_english_edu_links()` | Search and filter educational links |
| `load_content_webbaseloader()` | Extract content from web pages |
| `format_docs()` | Format extracted content with metadata |

## 📊 Configuration Options

### MCQ Generation
- **chunk_size**: 1000 characters (adjustable)
- **chunk_overlap**: 200 characters
- **embedding_model**: "sentence-transformers/all-MiniLM-L6-v2"
- **llm_model**: "llama-3.3-70b-versatile"
- **temperature**: 0 (deterministic output)

### Web Search
- **max_results**: 10 (filtered to top 5 English links)
- **region**: 'wt-wt' (Worldwide English)
- **safesearch**: True
- **preview_chars**: 1500 (content truncation limit)

## 🚀 Getting Started

1. Open `002.ipynb` in Jupyter Notebook or JupyterLab
2. Ensure your Groq API key is set in environment variables
3. Place your PDF file in the project directory
4. Run the MCQ generation cells for PDF-based questions
5. Run the web scraping cells to extract educational content from links

## 🔧 Customization

### Modify MCQ Generation
- Change `num_questions` parameter in the invoke call
- Adjust prompt template for different question styles
- Modify retrieval parameters for different context sizes

### Customize Web Search
- Modify domain filters in `get_top5_english_edu_links()`
- Adjust search regions and safety settings
- Change content preview limits in `format_docs()`

## 📝 Example Use Cases

1. **Educational Assessment**: Generate quizzes from textbook PDFs
2. **Content Curation**: Extract relevant information from educational websites
3. **Study Material Creation**: Create practice questions from course materials
4. **Research Assistance**: Gather information from multiple web sources

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⚠️ Important Notes

- Ensure you have sufficient Groq API credits for LLM calls
- PDF files should be text-based (not scanned images) for optimal results
- Web scraping respects robots.txt and follows ethical scraping practices
- Large PDFs may require chunking and multiple API calls

## 🐛 Troubleshooting

### Common Issues
1. **SSL Certificate Errors**: Update certificates or use `--trusted-host` for pip installs
2. **API Rate Limits**: Add delays between API calls if hitting rate limits
3. **Memory Issues**: Reduce chunk sizes for large documents
4. **Import Errors**: Ensure all dependencies are installed correctly

### Debug Tips
- Check Groq API key environment variable
- Verify PDF file path and readability
- Test internet connection for web scraping
- Monitor ChromaDB creation for embedding issues

## 📄 License

This project is open source. Please check the repository for license details.

## 🙏 Acknowledgments

- [LangChain](https://langchain.com/) for the RAG framework
- [Groq](https://groq.com/) for high-performance LLM inference
- [HuggingFace](https://huggingface.co/) for transformer models
- [ChromaDB](https://www.trychroma.com/) for vector database
- [DuckDuckGo](https://duckduckgo.com/) for search API
- [PyPDFLoader](https://pypdfloader.readthedocs.io/en/latest/) for PDF document processing
- [WebBaseLoader](https://webbaseloader.readthedocs.io/en/latest/) for web content extraction