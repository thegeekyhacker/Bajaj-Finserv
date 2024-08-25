from flask import Flask, request, jsonify, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")  #


@app.route("/bfhl", methods=["POST"])
def process_data():
    try:
        data = request.json.get("data", [])
        if not isinstance(data, list):
            return (
                jsonify({"is_success": False, "message": "Invalid input format"}),
                400,
            )

        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]

        lowercase_alphabets = [ch for ch in alphabets if ch.islower()]
        highest_lowercase_alphabet = (
            max(lowercase_alphabets) if lowercase_alphabets else None
        )

        response = {
            "is_success": True,
            "user_id": "utkarsh_tiwary_25032004",  # Replace with your actual user_id format
            "email": "utkarsh.tiwary2021@vitstudent.ac.in",
            "roll_number": "21BCE2061",
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": (
                [highest_lowercase_alphabet] if highest_lowercase_alphabet else []
            ),
        }

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"is_success": False, "message": str(e)}), 500


@app.route("/bfhl", methods=["GET"])
def get_operation_code():
    return jsonify({"operation_code": 1}), 200


if __name__ == "__main__":
    app.run(debug=True)
