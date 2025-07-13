class JsonViewerPopup {
  constructor(originalText) {
    this.collapsedPaths = new Set()
    this.initializeElements(originalText)
    this.attachEventListeners()
  }

  initializeElements(originalText) {
    this.jsonInput = document.getElementById("json-input")
    this.formatBtn = document.getElementById("format-btn")
    this.clearBtn = document.getElementById("clear-btn")
    this.jsonOutput = document.getElementById("json-output")
    this.status = document.getElementById("status")

    const input = originalText.trim()
    if (input.length > 0) {
        this.jsonInput.value = input
        this.formatJson()
    }
  }

  attachEventListeners() {
    this.formatBtn.addEventListener("click", () => this.formatJson())
    this.clearBtn.addEventListener("click", () => this.clearAll())
    this.jsonInput.addEventListener("input", () => this.hideStatus())
  }

  formatJson() {
    const input = this.jsonInput.value.trim()

    if (!input) {
      this.showStatus("Please enter some JSON content", "error")
      return
    }

    try {
      const jsonData = JSON.parse(input)
      this.renderJson(jsonData)
      this.showStatus("JSON formatted successfully!", "success")
    } catch (error) {
      this.showStatus(`Invalid JSON: ${error.message}`, "error")
    }
  }

  clearAll() {
    this.jsonInput.value = ""
    this.jsonOutput.innerHTML = ""
    this.hideStatus()
    this.collapsedPaths.clear()
  }

  showStatus(message, type) {
    this.status.textContent = message
    this.status.className = `status ${type}`
    this.status.style.display = "block"
  }

  hideStatus() {
    this.status.style.display = "none"
  }

  toggleCollapse(path) {
    if (this.collapsedPaths.has(path)) {
      this.collapsedPaths.delete(path)
    } else {
      this.collapsedPaths.add(path)
    }

    // Re-render with current JSON
    const input = this.jsonInput.value.trim()
    if (input) {
      try {
        const jsonData = JSON.parse(input)
        this.renderJson(jsonData)
      } catch (error) {
        // Handle error silently during toggle
      }
    }
  }

  parseJsonToNodes(obj, level = 0, parentPath = "", key = null) {
    const currentPath = parentPath ? `${parentPath}.${key || ""}` : key || ""
    const nodes = []

    if (obj === null) {
      nodes.push({ key, value: null, type: "null", level, path: currentPath })
    } else if (Array.isArray(obj)) {
      const isCollapsed = this.collapsedPaths.has(currentPath)
      nodes.push({ key, value: obj, type: "array", level, path: currentPath, isCollapsed })

      if (!isCollapsed) {
        obj.forEach((item, index) => {
          nodes.push(...this.parseJsonToNodes(item, level + 1, currentPath, index))
        })
      }
    } else if (typeof obj === "object") {
      const isCollapsed = this.collapsedPaths.has(currentPath)
      nodes.push({ key, value: obj, type: "object", level, path: currentPath, isCollapsed })

      if (!isCollapsed) {
        Object.entries(obj).forEach(([k, v]) => {
          nodes.push(...this.parseJsonToNodes(v, level + 1, currentPath, k))
        })
      }
    } else if (typeof obj === "boolean") {
      nodes.push({ key, value: obj, type: "boolean", level, path: currentPath })
    } else if (typeof obj === "string") {
      nodes.push({ key, value: obj, type: "string", level, path: currentPath })
    } else if (typeof obj === "number") {
      nodes.push({ key, value: obj, type: "number", level, path: currentPath })
    } else {
        nodes.push({ key, value: obj, type: "missing-type", level, path: currentPath })
    }

    return nodes
  }

  renderJson(jsonData) {
    const nodes = this.parseJsonToNodes(jsonData)
    let html = ""
    let lineNumber = 1

    nodes.forEach((node) => {
      const hasToggle = node.type === "object" || node.type === "array"

      html += `<div class="json-line">`

      // Line number
      html += `<span class="line-number">${lineNumber}</span>`

      // Toggle button or placeholder
      if (hasToggle) {
        const toggleIcon = node.isCollapsed ? "+" : "-"
        html += `<button class="toggle-btn" data-path="${node.path}">${toggleIcon}</button>`
      } else {
        html += '<span class="toggle-placeholder"></span>'
      }

      // JSON content
      html += `<span class="json-content">`
      html += `<span style="color: transparent;padding-left: ${16 + node.level * 16}px;"> </span>`

      if (node.key !== null && node.key !== undefined) {
        html += `<span class="key">"${node.key}"</span><span style="color: #666;">: </span>`
      }

      const valueDisplay = this.getValueDisplay(node)
      const valueClass = this.getValueClass(node.type)
      html += `<span class="${valueClass}">${valueDisplay}</span>`

      html += "</span></div>"
      lineNumber++
    })

    // Add closing braces
    const openBraces = this.countOpenBraces(nodes)
    for (let i = 0; i < openBraces; i++) {
      html += `<div class="json-line">`
      html += `<span class="line-number">${lineNumber}</span>`
      html += '<span class="toggle-placeholder"></span>'
      html += `<span class="json-content">`
      html += `<span style="color: transparent;padding-left:${(openBraces+1-i)*16}px"></span>`
      html += `<span class="bracket">}</span>`
      html += "</span></div>"
      lineNumber++
    }

    this.jsonOutput.innerHTML = html

    // Add event listeners for toggle buttons
    this.jsonOutput.querySelectorAll(".toggle-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const path = e.target.getAttribute("data-path")
        this.toggleCollapse(path)
      })
    })
  }

  getValueDisplay(node) {
    switch (node.type) {
      case "object":
        const objLength = Object.keys(node.value).length
        return node.isCollapsed ? `{...}` : "{"
      case "array":
        const arrLength = node.value.length
        return node.isCollapsed ? `[...]` : "["
      case "string":
        return `"${node.value}"`
      case "null":
        return "null"
      default:
        return String(node.value)
    }
  }

  getValueClass(type) {
    switch (type) {
      case "string":
        return "string-value"
      case "number":
        return "number-value"
      case "boolean":
        return "boolean-value"
      case "null":
        return "null-value"
      case "object":
      case "array":
        return "bracket"
      default:
        return ""
    }
  }

  countOpenBraces(nodes) {
    let count = 0
    nodes.forEach((node) => {
      if ((node.type === "object" || node.type === "array") && !node.isCollapsed) {
        count++
      }
    })
    return count
  }
}

document.addEventListener('DOMContentLoaded', () => {
    // 处理后台消息
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'showJsonFormat') {
            new JsonViewerPopup(request.originalText)
        }
    });
});

import { localizeHtmlPage } from './utils/localization.js';

localizeHtmlPage();