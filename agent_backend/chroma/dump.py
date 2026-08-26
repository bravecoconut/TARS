from agent.system.configurations.configs.skills import (
    SKILL_DB_PATH,
)
import chromadb
from chromadb.utils import embedding_functions
import json
from utils import r_h, get_all_ids_in_collection


def dump_in(documents, ids, collec_name, metadatas=None):
    try:
        with open("user.json") as file:
            _user = json.load(file)

        openai_ef = embedding_functions.OpenAIEmbeddingFunction(
            api_key=_user["api_key"],
            api_base=_user["base_url"],
            model_name=_user["embedding_model"],
        )

        client = chromadb.PersistentClient(path=SKILL_DB_PATH)

        collection = client.get_or_create_collection(
            name=collec_name, embedding_function=openai_ef
        )

        collection.add(
            documents=documents,
            metadatas=metadatas,
            ids=ids,
        )

        return r_h(
            True,
            "data dumped",
            {
                "name": collection.name,
                "counts": collection.count(),
            },
        )

    except Exception as e:
        return r_h(False, "something went wrong while dumping data", e)


def delete_using_meta(collec_name, metadatas=None):
    try:
        client = chromadb.PersistentClient(path=SKILL_DB_PATH)

        collection = client.get_or_create_collection(
            name=collec_name,
        )

        collection.delete(where=metadatas)

        return r_h(
            True,
            "vectors cleared using given meta",
            {
                "name": collection.name,
                "counts": collection.count(),
            },
        )

    except Exception as e:
        return r_h(False, "something went wrong while deleting documents", e)


def delete_all_documents(collec_name):
    try:
        client = chromadb.PersistentClient(path=SKILL_DB_PATH)

        collection = client.get_or_create_collection(
            name=collec_name,
        )

        all_ids = collection.get()["ids"]
        if all_ids:
            collection.delete(ids=all_ids)

        return r_h(
            True,
            "data dumped",
            {
                "name": collection.name,
                "counts": collection.count(),
            },
        )

    except Exception as e:
        return r_h(False, "something went wrong while deleting all documents", e)


def get_counts(collec_name, metadatas):
    try:
        client = chromadb.PersistentClient(path=SKILL_DB_PATH)

        collection = client.get_or_create_collection(
            name=collec_name,
        )

        meta_documents = collection.get(where=metadatas)

        return r_h(
            True,
            "get counts",
            {
                "meta": metadatas,
                "counts": len(meta_documents["ids"]),
            },
        )

    except Exception as e:
        return r_h(False, "something went wrong while getting counts", e)


if __name__ == "__main__":

    print(
        get_counts(
            collec_name="base",
            # metadatas={"session_id": "6a8f251f13f20d7c69a7a377"},
        )
    )
